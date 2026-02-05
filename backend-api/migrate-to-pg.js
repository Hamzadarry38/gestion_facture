const { Pool } = require('pg');
const initSqlJs = require('sql.js');
const path = require('path');
const fs = require('fs');

// --- CONFIGURATION ---
const POSTGRES_CONFIG = {
    user: 'postgres',
    host: 'localhost',
    database: 'facture_db',
    password: '123456',
    port: 5432,
};

const SQLITE_DBs = [
    { name: 'MRY', path: path.join(process.env.APPDATA, 'gestion-factures', 'invoices.db') },
    { name: 'CHAIMAE', path: path.join(process.env.APPDATA, 'gestion-factures', 'invoices_chaimae.db') },
    { name: 'MULTI', path: path.join(process.env.APPDATA, 'gestion-factures', 'multi.db') },
];

const pool = new Pool(POSTGRES_CONFIG);

async function migrate() {
    console.log('🚀 Starting Migration (via sql.js)...');

    try {
        // Initialize SQL.js
        const SQL = await initSqlJs();

        // --- Fetch or Create Admin User for Attribution ---
        const adminEmail = 'redouanerrebbahi99@gmail.com';
        let adminRes = await pool.query("SELECT id, name, email FROM users WHERE email = $1", [adminEmail]);

        if (adminRes.rows.length === 0) {
            console.log(`   - Creating admin user for attribution...`);
            await pool.query(
                "INSERT INTO users (name, email, password, can_auto_validate) VALUES ($1, $2, $3, $4) ON CONFLICT (email) DO NOTHING",
                ['Admin', adminEmail, 'admin123', true]
            );
            adminRes = await pool.query("SELECT id, name, email FROM users WHERE email = $1", [adminEmail]);
        }

        const admin = adminRes.rows[0];

        for (const sqlite of SQLITE_DBs) {
            if (!fs.existsSync(sqlite.path)) {
                console.log(`⚠️ Skipping ${sqlite.name}: File not found at ${sqlite.path}`);
                continue;
            }

            console.log(`\n📦 Migrating: ${sqlite.name}...`);
            const fileBuffer = fs.readFileSync(sqlite.path);
            const db = new SQL.Database(fileBuffer);

            try {
                // 1. Migrate Clients
                const clientData = db.exec('SELECT * FROM clients')[0];
                const clients = clientData?.values || [];
                const clientCols = clientData?.columns || [];

                const clientObjects = clients.map(row => {
                    const obj = {};
                    clientCols.forEach((col, i) => obj[col] = row[i]);
                    return obj;
                });

                console.log(`   - Found ${clientObjects.length} clients`);
                const clientMap = new Map();

                for (const client of clientObjects) {
                    const res = await pool.query(
                        'INSERT INTO clients (nom, ice, company_code, created_at) VALUES ($1, $2, $3, $4) RETURNING id',
                        [client.nom, client.ice, sqlite.name, client.created_at]
                    );
                    clientMap.set(client.id, res.rows[0].id);
                }

                // 2. Migrate Invoices
                const invoiceData = db.exec('SELECT * FROM invoices')[0];
                const invoices = invoiceData?.values || [];
                const invoiceCols = invoiceData?.columns || [];

                const invoiceObjects = invoices.map(row => {
                    const obj = {};
                    invoiceCols.forEach((col, i) => obj[col] = row[i]);
                    return obj;
                });

                console.log(`   - Found ${invoiceObjects.length} invoices`);

                for (const inv of invoiceObjects) {
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
                            inv.document_numero, inv.document_numero_Order || inv.document_numero_order, inv.document_numero_bl,
                            inv.document_numero_devis, inv.document_order_devis, inv.document_bon_de_livraison,
                            inv.document_numero_commande, inv.year, inv.sequential_id, inv.total_ht,
                            inv.tva_rate, inv.montant_tva, inv.total_ttc, inv.created_at, inv.updated_at,
                            admin.email, admin.id, admin.name, admin.email,
                            'validated', 'normal', 'sans_accuse'
                        ]
                    );
                    const newInvoiceId = res.rows[0].id;

                    // 3. Products
                    const productData = db.exec('SELECT * FROM invoice_products WHERE invoice_id = ' + inv.id)[0];
                    const products = productData?.values || [];
                    const productCols = productData?.columns || [];

                    const productObjects = products.map(row => {
                        const obj = {};
                        productCols.forEach((col, i) => obj[col] = row[i]);
                        return obj;
                    });

                    for (const prod of productObjects) {
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
    } catch (globalErr) {
        console.error('❌ Global Migration Error:', globalErr.message);
    } finally {
        await pool.end();
    }

    console.log('\n✨ Overall Migration Finished!');
}

migrate();
