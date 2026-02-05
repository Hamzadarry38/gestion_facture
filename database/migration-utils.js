const { Pool } = require('pg');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

async function all(db, sql, params = []) {
    return new Promise((resolve, reject) => {
        db.all(sql, params, (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
        });
    });
}

async function migrateAllToPostgres(pgConfig, appDataPath) {
    const pool = new Pool(pgConfig);
    const results = [];

    // 0. Migrate Users first
    const usersDbPath = path.join(appDataPath, 'users.db');
    if (fs.existsSync(usersDbPath)) {
        console.log("Migrating USERS from SQLite...");
        const udb = new sqlite3.Database(usersDbPath);
        try {
            const rows = await all(udb, 'SELECT * FROM users');
            for (const user of rows) {
                // Check if user exists
                const existing = await pool.query('SELECT id FROM users WHERE email = $1', [user.email]);
                if (existing.rows.length === 0) {
                    await pool.query(
                        'INSERT INTO users (name, email, password, can_auto_validate) VALUES ($1, $2, $3, $4)',
                        [user.name, user.email, user.password, user.can_auto_validate]
                    );
                }
            }
            results.push({ name: 'USERS', status: 'success', count: rows.length });
        } catch (err) {
            results.push({ name: 'USERS', status: 'error', message: err.message });
        } finally {
            udb.close();
        }
    }

    const SQLITE_DBs = [
        { name: 'MRY', path: path.join(appDataPath, 'invoices.db') },
        { name: 'CHAIMAE', path: path.join(appDataPath, 'invoices_chaimae.db') },
        { name: 'MULTI', path: path.join(appDataPath, 'multi.db') },
    ];

    try {
        // --- Fetch or Create Admin User for Attribution ---
        const adminEmail = 'redouanerrebbahi99@gmail.com';
        let adminRes = await pool.query("SELECT id, name, email FROM users WHERE email = $1", [adminEmail]);

        if (adminRes.rows.length === 0) {
            console.log(`⚠️ Admin user (${adminEmail}) not found in PG. Creating...`);
            await pool.query(
                "INSERT INTO users (name, email, password, can_auto_validate) VALUES ($1, $2, $3, $4) ON CONFLICT (email) DO NOTHING",
                ['Admin', adminEmail, 'admin123', true]
            );
            adminRes = await pool.query("SELECT id, name, email FROM users WHERE email = $1", [adminEmail]);
        } else {
            // Ensure permissions are enabled
            await pool.query("UPDATE users SET can_auto_validate = TRUE WHERE id = $1", [adminRes.rows[0].id]);
        }

        const adminUser = adminRes.rows.length > 0 ? adminRes.rows[0] : null;


        for (const sqlite of SQLITE_DBs) {
            if (!fs.existsSync(sqlite.path)) {
                results.push({ name: sqlite.name, status: 'skipped', message: 'File not found' });
                continue;
            }

            const db = new sqlite3.Database(sqlite.path);
            try {
                // 1. Migrate Clients
                const clients = await all(db, 'SELECT * FROM clients');
                console.log(`[${sqlite.name}] Found ${clients.length} clients`);
                const clientMap = new Map(); // Old ID -> New ID

                for (const client of clients) {
                    // Check existing
                    const existing = await pool.query('SELECT id FROM clients WHERE ice = $1 AND company_code = $2', [client.ice, sqlite.name]);
                    let newClientId;
                    if (existing.rows.length > 0) {
                        newClientId = existing.rows[0].id;
                    } else {
                        const res = await pool.query(
                            'INSERT INTO clients (nom, ice, company_code, created_at) VALUES ($1, $2, $3, $4) RETURNING id',
                            [client.nom, client.ice, sqlite.name, client.created_at]
                        );
                        newClientId = res.rows[0].id;
                    }
                    clientMap.set(client.id, newClientId);
                }

                // 2. Migrate Invoices
                const invoices = await all(db, 'SELECT * FROM invoices');
                console.log(`[${sqlite.name}] Found ${invoices.length} invoices`);
                let invoicesMigrated = 0;

                for (const inv of invoices) {
                    const newClientId = clientMap.get(inv.client_id);
                    if (!newClientId) continue; // Should not happen if data consistent

                    // Insert Invoice
                    const res = await pool.query(
                        `INSERT INTO invoices (
                            company_code, client_id, document_type, document_date, 
                            document_numero, document_numero_order, document_numero_bl, 
                            document_numero_devis, document_order_devis, document_bon_de_livraison, 
                            document_numero_commande, year, sequential_id, total_ht, tva_rate, 
                            montant_tva, total_ttc, created_at, updated_at
                        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19) RETURNING id`,
                        [
                            sqlite.name, newClientId, inv.document_type, inv.document_date,
                            inv.document_numero, inv.document_numero_Order, inv.document_numero_bl,
                            inv.document_numero_devis, inv.document_order_devis, inv.document_bon_de_livraison,
                            inv.document_numero_commande, inv.year, inv.sequential_id, inv.total_ht,
                            inv.tva_rate, inv.montant_tva, inv.total_ttc, inv.created_at, inv.updated_at
                        ]
                    );
                    const newInvoiceId = res.rows[0].id;
                    invoicesMigrated++;

                    // 3. Products
                    const products = await all(db, 'SELECT * FROM invoice_products WHERE invoice_id = ?', [inv.id]);
                    for (const prod of products) {
                        await pool.query(
                            'INSERT INTO invoice_products (invoice_id, designation, quantite, prix_unitaire_ht, total_ht) VALUES ($1, $2, $3, $4, $5)',
                            [newInvoiceId, prod.designation, prod.quantite, prod.prix_unitaire_ht, prod.total_ht]
                        );
                    }
                }
                results.push({ name: sqlite.name, status: 'success', count: invoicesMigrated });

            } catch (err) {
                console.error(`Error migrating ${sqlite.name}:`, err);
                results.push({ name: sqlite.name, status: 'error', message: err.message });
            } finally {
                db.close();
            }
        }

        // --- SECONDARY COMPANIES MIGRATION (Devis & PDF Tracks) ---
        const SECONDARY_DBs = [
            { name: 'SAAISS', path: path.join(appDataPath, 'saaiss.db') },
            { name: 'SMARTS', path: path.join(appDataPath, 'smarts.db') },
            { name: 'MSH3', path: path.join(appDataPath, 'msh3.db') },
            { name: 'BENALI', path: path.join(appDataPath, 'benali.db') },
            { name: 'SKM', path: path.join(appDataPath, 'skm.db') },
        ];


        for (const sec of SECONDARY_DBs) {
            console.warn(`Skipping migration for ${sec.name} as SQLite support is removed.`);
            /*
            if (!fs.existsSync(sec.path)) {
                results.push({ name: sec.name, status: 'skipped', message: 'File not found' });
                continue;
            }

            const db = new sqlite3.Database(sec.path);
            try {
                // ... logic ...
            } finally {
                db.close();
            }
            */
        }
    } catch (globalErr) {
        throw globalErr;
    } finally {
        await pool.end();
    }

    return results;
}

module.exports = { migrateAllToPostgres };
