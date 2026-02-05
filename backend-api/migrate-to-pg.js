const { Pool } = require('pg');
// const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

// --- CONFIGURATION ---
const POSTGRES_CONFIG = {
    user: 'postgres',
    host: 'localhost',
    database: 'facture_db',
    password: '123456', // Change this!
    port: 5432,
};

// List of SQLite databases to migrate
// Note: company_code will be added to identify which DB the data came from
const SQLITE_DBs = [
    { name: 'MRY', path: path.join(process.env.APPDATA, 'gestion-factures', 'invoices.db') },
    { name: 'CHAIMAE', path: path.join(process.env.APPDATA, 'gestion-factures', 'invoices_chaimae.db') },
    { name: 'MULTI', path: path.join(process.env.APPDATA, 'gestion-factures', 'multi.db') },
    // Add others if needed
];

const pool = new Pool(POSTGRES_CONFIG);

async function migrate() {
    console.log('🚀 Starting Migration...');

    for (const sqlite of SQLITE_DBs) {
        console.warn("Skipping migration for " + sqlite.name + " as SQLite support is removed.");
        continue;
        /*
        if (!fs.existsSync(sqlite.path)) {
            console.log(`⚠️ Skipping ${sqlite.name}: File not found at ${sqlite.path}`);
            continue;
        }

        console.log(`\n📦 Migrating: ${sqlite.name}...`);
        const db = new sqlite3.Database(sqlite.path);
        */

        try {
            // 1. Migrate Clients
            const clients = await all(db, 'SELECT * FROM clients');
            console.log(`   - Found ${clients.length} clients`);

            const clientMap = new Map(); // Old ID -> New ID

            for (const client of clients) {
                const res = await pool.query(
                    'INSERT INTO clients (nom, ice, company_code, created_at) VALUES ($1, $2, $3, $4) RETURNING id',
                    [client.nom, client.ice, sqlite.name, client.created_at]
                );
                clientMap.set(client.id, res.rows[0].id);
            }

            // 2. Migrate Invoices
            const invoices = await all(db, 'SELECT * FROM invoices');
            console.log(`   - Found ${invoices.length} invoices`);

            for (const inv of invoices) {
                const newClientId = clientMap.get(inv.client_id);

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

                // 3. Migrate Products for this invoice
                const products = await all(db, 'SELECT * FROM invoice_products WHERE invoice_id = ?', [inv.id]);
                for (const prod of products) {
                    await pool.query(
                        'INSERT INTO invoice_products (invoice_id, designation, quantite, prix_unitaire_ht, total_ht) VALUES ($1, $2, $3, $4, $5)',
                        [newInvoiceId, prod.designation, prod.quantite, prod.prix_unitaire_ht, prod.total_ht]
                    );
                }
            }

            console.log(`✅ ${sqlite.name} Migrated successfully!`);
        } catch (err) {
            console.error(`❌ Error migrating ${sqlite.name}:`, err.message);
        } finally {
            db.close();
        }
    }

    console.log('\n✨ Overall Migration Finished!');
    await pool.end();
}

// Utility to promisify sqlite3 .all()
function all(db, sql, params = []) {
    return new Promise((resolve, reject) => {
        if (!db) {
            return reject(new Error('Database connection is not initialized'));
        }
        db.all(sql, params, (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
        });
    });
}

migrate();
