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
        const udb = new sqlite3.Database(usersDbPath);
        try {
            const users = await all(udb, 'SELECT * FROM users');
            for (const user of users) {
                await pool.query(
                    'INSERT INTO users (name, email, password, created_at) VALUES ($1, $2, $3, $4) ON CONFLICT (email) DO NOTHING',
                    [user.name, user.email, user.password, user.created_at]
                );
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
                const clientMap = new Map();

                for (const client of clients) {
                    const res = await pool.query(
                        'INSERT INTO clients (nom, ice, company_code, created_at) VALUES ($1, $2, $3, $4) RETURNING id',
                        [client.nom, client.ice, sqlite.name, client.created_at]
                    );
                    clientMap.set(client.id, res.rows[0].id);
                }

                // 2. Migrate Invoices
                const invoices = await all(db, 'SELECT * FROM invoices');
                for (const inv of invoices) {
                    const newClientId = clientMap.get(inv.client_id);
                    const res = await pool.query(
                        `INSERT INTO invoices (
                            company_code, client_id, document_type, document_date, 
                            document_numero, document_numero_order, document_numero_bl, 
                            document_numero_devis, document_order_devis, document_bon_de_livraison, 
                            document_numero_commande, year, sequential_id, total_ht, tva_rate, 
                            montant_tva, total_ttc, created_at, updated_at,
                            created_by, created_by_user_id, created_by_user_name, created_by_user_email,
                            validation_status
                        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24) RETURNING id`,
                        [
                            sqlite.name, newClientId, inv.document_type, inv.document_date,
                            inv.document_numero, inv.document_numero_Order || inv.document_numero_order,
                            inv.document_numero_bl, inv.document_numero_devis, inv.document_order_devis,
                            inv.document_bon_de_livraison, inv.document_numero_commande, inv.year,
                            inv.sequential_id, inv.total_ht, inv.tva_rate, inv.montant_tva,
                            inv.total_ttc, inv.created_at, inv.updated_at,
                            adminUser ? adminUser.email : adminEmail,
                            adminUser ? adminUser.id : (inv.created_by_user_id || null),
                            adminUser ? adminUser.name : 'Admin',
                            adminUser ? adminUser.email : adminEmail,
                            'validated' // All migrated instances are considered validated
                        ]
                    );
                    const newInvoiceId = res.rows[0].id;

                    // 3. Migrate Products
                    const products = await all(db, 'SELECT * FROM invoice_products WHERE invoice_id = ?', [inv.id]);
                    for (const prod of products) {
                        await pool.query(
                            'INSERT INTO invoice_products (invoice_id, designation, quantite, prix_unitaire_ht, total_ht) VALUES ($1, $2, $3, $4, $5)',
                            [newInvoiceId, prod.designation, prod.quantite, prod.prix_unitaire_ht, prod.total_ht]
                        );
                    }

                    // 4. Migrate Attachments (PDF References)
                    try {
                        const attachments = await all(db, 'SELECT * FROM attachments WHERE invoice_id = ?', [inv.id]);
                        for (const att of attachments) {
                            await pool.query(
                                'INSERT INTO attachments (invoice_id, filename, file_type, file_size, file_data, file_path, uploaded_at) VALUES ($1, $2, $3, $4, $5, $6, $7)',
                                [newInvoiceId, att.filename, att.file_type, att.file_size, att.file_data, att.file_path, att.uploaded_at]
                            );
                        }
                    } catch (e) {
                        // Some DBs might not have attachments table yet or different structure
                    }
                }
                results.push({ name: sqlite.name, status: 'success', count: invoices.length });
            } catch (err) {
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
            if (!fs.existsSync(sec.path)) {
                results.push({ name: sec.name, status: 'skipped', message: 'File not found' });
                continue;
            }

            const db = new sqlite3.Database(sec.path);
            const lowerName = sec.name.toLowerCase();
            try {
                // 1. Migrate Devis Numbers
                const devisRows = await all(db, `SELECT * FROM ${lowerName}_devis_numbers`);
                for (const row of devisRows) {
                    await pool.query(
                        `INSERT INTO ${lowerName}_devis_numbers (devis_number, year, company_code, created_at, used_at) 
                         VALUES ($1, $2, $3, $4, $5) 
                         ON CONFLICT (devis_number, year) DO NOTHING`,
                        [row.devis_number, row.year, sec.name, row.created_at, row.used_at]
                    );
                }

                // 2. Migrate PDF Tracks
                const pdfRows = await all(db, `SELECT * FROM ${lowerName}_pdf_files`);
                for (const row of pdfRows) {
                    await pool.query(
                        `INSERT INTO ${lowerName}_pdf_files (devis_number, year, file_path, created_by, created_at) 
                         VALUES ($1, $2, $3, $4, $5) 
                         ON CONFLICT (devis_number, year) DO NOTHING`,
                        [row.devis_number, row.year, row.file_path, adminUser ? adminUser.name : (row.created_by || 'Unknown'), row.created_at]
                    );
                }

                results.push({ name: sec.name, status: 'success', count: devisRows.length + pdfRows.length });
            } catch (err) {
                results.push({ name: sec.name, status: 'error', message: err.message });
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
