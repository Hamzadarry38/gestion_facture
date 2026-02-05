const { Pool } = require('pg');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

async function migrateAllToPostgres(pgConfig, appDataPath) {
    const pool = new Pool(pgConfig);
    const results = [];

    // 0. Migrate Users first
    const usersDbPath = path.join(appDataPath, 'users.db');
    if (fs.existsSync(usersDbPath)) {
        console.log("Migrating USERS from SQLite...");
        const udb = new sqlite3.Database(usersDbPath);
        
        try {
            const users = await new Promise((resolve, reject) => {
                udb.all('SELECT * FROM users', (err, rows) => {
                    if (err) reject(err);
                    else resolve(rows);
                });
            });

            for (const user of users) {
                const existing = await pool.query('SELECT id FROM users WHERE email = $1', [user.email]);
                if (existing.rows.length === 0) {
                    await pool.query(
                        'INSERT INTO users (name, email, password, can_auto_validate) VALUES ($1, $2, $3, $4)',
                        [user.name, user.email, user.password, user.can_auto_validate]
                    );
                }
            }
            results.push({ name: 'USERS', status: 'success', count: users.length });
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
            await pool.query(
                "INSERT INTO users (name, email, password, can_auto_validate) VALUES ($1, $2, $3, $4) ON CONFLICT (email) DO NOTHING",
                ['Admin', adminEmail, 'admin123', true]
            );
            adminRes = await pool.query("SELECT id, name, email FROM users WHERE email = $1", [adminEmail]);
        }
        
        const admin = adminRes.rows[0];

        for (const sqlite of SQLITE_DBs) {
            if (!fs.existsSync(sqlite.path)) {
                results.push({ name: sqlite.name, status: 'skipped', message: 'File not found' });
                continue;
            }

            const db = new sqlite3.Database(sqlite.path);
            
            try {
                // 1. Migrate Clients
                const clients = await new Promise((resolve, reject) => {
                    db.all('SELECT * FROM clients', (err, rows) => {
                        if (err) reject(err);
                        else resolve(rows);
                    });
                });

                console.log(`[${sqlite.name}] Found ${clients.length} clients`);
                const clientMap = new Map();

                for (const client of clients) {
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
                const invoices = await new Promise((resolve, reject) => {
                    db.all('SELECT * FROM invoices', (err, rows) => {
                        if (err) reject(err);
                        else resolve(rows);
                    });
                });

                console.log(`[${sqlite.name}] Found ${invoices.length} invoices`);
                let invoicesMigrated = 0;

                for (const inv of invoices) {
                    const newClientId = clientMap.get(inv.client_id);
                    if (!newClientId) continue;

                    const res = await pool.query(
                        `INSERT INTO invoices (
                            company_code, client_id, document_type, document_date, 
                            document_numero, document_numero_order, document_numero_bl, 
                            document_numero_devis, document_order_devis, document_bon_de_livraison, 
                            document_numero_commande, year, sequential_id, total_ht, tva_rate, 
                            montant_tva, total_ttc, created_at, updated_at,
                            created_by, created_by_user_id, created_by_user_name, created_by_user_email,
                            validation_status, creation_method, ar_status, attachment_count
                        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, 0) RETURNING id`,
                        [
                            sqlite.name, newClientId, inv.document_type, inv.document_date,
                            inv.document_numero, inv.document_numero_Order, inv.document_numero_bl,
                            inv.document_numero_devis, inv.document_order_devis, inv.document_bon_de_livraison,
                            inv.document_numero_commande, inv.year, inv.sequential_id, inv.total_ht,
                            inv.tva_rate, inv.montant_tva, inv.total_ttc, inv.created_at, inv.updated_at,
                            admin.email, admin.id, admin.name, admin.email,
                            'validated', 'normal', 'sans_accuse'
                        ]
                    );
                    const newInvoiceId = res.rows[0].id;
                    invoicesMigrated++;

                    // 3. Products
                    const products = await new Promise((resolve, reject) => {
                        db.all('SELECT * FROM invoice_products WHERE invoice_id = ?', [inv.id], (err, rows) => {
                            if (err) reject(err);
                            else resolve(rows);
                        });
                    });

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
    } catch (globalErr) {
        throw globalErr;
    } finally {
        await pool.end();
    }

    return results;
}

module.exports = { migrateAllToPostgres };
