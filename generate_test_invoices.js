const initSqlJs = require('sql.js');
const fs = require('fs');
const path = require('path');
const { app } = require('electron');

// Fake data generators
const clientNames = [
    'SARL ATLAS CONSTRUCTION', 'STE MAROC TRAVAUX', 'ENTREPRISE AL OMRANE',
    'SOCIETE GENERALE BATIMENT', 'RIAD CONSTRUCTION', 'CASABLANCA WORKS',
    'FES RENOVATION', 'RABAT INFRASTRUCTURE', 'TANGER BUILDING CO',
    'AGADIR CONSTRUCTION', 'MARRAKECH TRAVAUX', 'MEKNES BATIMENT',
    'OUJDA CONSTRUCTION', 'TETOUAN WORKS', 'KENITRA BUILDING',
    'SAFI TRAVAUX', 'ESSAOUIRA CONSTRUCTION', 'NADOR BATIMENT',
    'BENI MELLAL WORKS', 'KHOURIBGA CONSTRUCTION'
];

const productNames = [
    'Ciment CPJ 45', 'Sable de construction', 'Gravier 15/25',
    'Fer à béton Ø12', 'Fer à béton Ø16', 'Briques creuses',
    'Parpaing 20x20x50', 'Carrelage 60x60', 'Peinture blanche',
    'Enduit de façade', 'Plâtre', 'Isolation thermique',
    'Tuyau PVC Ø110', 'Câble électrique', 'Porte en bois',
    'Fenêtre aluminium', 'Sanitaire complet', 'Robinetterie'
];

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomFloat(min, max, decimals = 2) {
    return parseFloat((Math.random() * (max - min) + min).toFixed(decimals));
}

function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function randomElement(array) {
    return array[randomInt(0, array.length - 1)];
}

function generateICE() {
    return '00' + randomInt(1000000000, 9999999999);
}

async function generateTestData() {
    console.log('🚀 Starting test data generation...\n');

    const SQL = await initSqlJs();
    const appDataPath = app ? app.getPath('userData') : path.join(__dirname, 'test_data');

    if (!app) {
        if (!fs.existsSync(appDataPath)) {
            fs.mkdirSync(appDataPath, { recursive: true });
        }
    }

    const databases = [
        { name: 'MRY', path: path.join(appDataPath, 'invoices.db'), count: 700 },
        { name: 'CHAIMAE', path: path.join(appDataPath, 'invoices_chaimae.db'), count: 800 },
        { name: 'MULTI', path: path.join(appDataPath, 'multi.db'), count: 500 }
    ];

    const startDate = new Date('2023-01-01');
    const endDate = new Date('2025-12-31');

    for (const dbConfig of databases) {
        console.log(`\n📊 Generating ${dbConfig.count} invoices for ${dbConfig.name}...`);

        let db;
        if (fs.existsSync(dbConfig.path)) {
            const fileBuffer = fs.readFileSync(dbConfig.path);
            db = new SQL.Database(fileBuffer);
            console.log(`✅ Loaded existing database: ${dbConfig.path}`);
        } else {
            db = new SQL.Database();
            console.log(`✅ Created new database: ${dbConfig.path}`);
        }

        // Create tables if they don't exist
        db.run(`
            CREATE TABLE IF NOT EXISTS clients (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                nom TEXT NOT NULL,
                ice TEXT,
                created_at TEXT DEFAULT CURRENT_TIMESTAMP
            )
        `);

        // Create invoices table with ALL columns the app expects
        const isMRY = dbConfig.name === 'MRY';
        const invoicesSchema = `
            CREATE TABLE IF NOT EXISTS invoices (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                ${isMRY ? 'company_code TEXT,' : ''}
                client_id INTEGER,
                document_type TEXT NOT NULL,
                document_date TEXT,
                document_numero TEXT,
                document_numero_Order TEXT,
                document_numero_bl TEXT,
                document_numero_devis TEXT,
                document_order_devis TEXT,
                document_bon_de_livraison TEXT,
                document_numero_commande TEXT,
                year INTEGER,
                sequential_id INTEGER,
                total_ht REAL,
                tva_rate REAL,
                montant_tva REAL,
                total_ttc REAL,
                created_at TEXT DEFAULT CURRENT_TIMESTAMP,
                updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
                created_by_user_id INTEGER,
                created_by_user_name TEXT,
                created_by_user_email TEXT,
                updated_by_user_id INTEGER,
                updated_by_user_name TEXT,
                updated_by_user_email TEXT,
                creation_method TEXT
            )
        `;

        db.run(invoicesSchema);

        db.run(`
            CREATE TABLE IF NOT EXISTS invoice_products (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                invoice_id INTEGER,
                designation TEXT NOT NULL,
                quantite REAL,
                prix_unitaire_ht REAL,
                total_ht REAL
            )
        `);

        // Generate clients
        const clientIds = [];
        const numClients = Math.min(dbConfig.count / 10, clientNames.length);

        for (let i = 0; i < numClients; i++) {
            const clientName = clientNames[i % clientNames.length];
            const ice = generateICE();
            const createdAt = randomDate(startDate, endDate).toISOString();

            db.run(
                'INSERT INTO clients (nom, ice, created_at) VALUES (?, ?, ?)',
                [clientName, ice, createdAt]
            );

            const result = db.exec('SELECT last_insert_rowid() as id');
            clientIds.push(result[0].values[0][0]);
        }

        console.log(`✅ Created ${clientIds.length} clients`);

        // Generate invoices
        const documentTypes = ['facture', 'devis', 'bon_livraison'];
        let invoicesCreated = 0;

        for (let i = 0; i < dbConfig.count; i++) {
            const clientId = randomElement(clientIds);
            const docType = randomElement(documentTypes);
            const docDate = randomDate(startDate, endDate);
            const year = docDate.getFullYear();
            const sequentialId = i + 1;

            let docNumero = '';
            if (docType === 'facture') {
                docNumero = `F${year}-${String(sequentialId).padStart(4, '0')}`;
            } else if (docType === 'devis') {
                docNumero = `D${year}-${String(sequentialId).padStart(4, '0')}`;
            } else {
                docNumero = `BL${year}-${String(sequentialId).padStart(4, '0')}`;
            }

            const totalHT = randomFloat(1000, 50000, 2);
            const tvaRate = 20;
            const montantTVA = parseFloat((totalHT * tvaRate / 100).toFixed(2));
            const totalTTC = parseFloat((totalHT + montantTVA).toFixed(2));

            db.run(
                `INSERT INTO invoices (
                    client_id, document_type, document_date, document_numero,
                    year, sequential_id, total_ht, tva_rate, montant_tva, total_ttc,
                    created_at, updated_at
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [
                    clientId, docType, docDate.toISOString().split('T')[0], docNumero,
                    year, sequentialId, totalHT, tvaRate, montantTVA, totalTTC,
                    docDate.toISOString(), docDate.toISOString()
                ]
            );

            const invoiceResult = db.exec('SELECT last_insert_rowid() as id');
            const invoiceId = invoiceResult[0].values[0][0];

            // Generate 2-5 products per invoice
            const numProducts = randomInt(2, 5);
            let productTotalHT = 0;

            for (let j = 0; j < numProducts; j++) {
                const designation = randomElement(productNames);
                const quantite = randomFloat(1, 100, 2);
                const prixUnitaire = randomFloat(10, 500, 2);
                const productTotal = parseFloat((quantite * prixUnitaire).toFixed(2));
                productTotalHT += productTotal;

                db.run(
                    'INSERT INTO invoice_products (invoice_id, designation, quantite, prix_unitaire_ht, total_ht) VALUES (?, ?, ?, ?, ?)',
                    [invoiceId, designation, quantite, prixUnitaire, productTotal]
                );
            }

            invoicesCreated++;

            if (invoicesCreated % 100 === 0) {
                console.log(`  ⏳ Progress: ${invoicesCreated}/${dbConfig.count} invoices created...`);
            }
        }

        console.log(`✅ Created ${invoicesCreated} invoices with products`);

        // Save database
        const data = db.export();
        const buffer = Buffer.from(data);
        fs.writeFileSync(dbConfig.path, buffer);
        db.close();

        console.log(`💾 Saved database: ${dbConfig.path}`);
    }

    console.log('\n\n🎉 Test data generation complete!');
    console.log('📊 Summary:');
    console.log(`  - MRY: 700 invoices`);
    console.log(`  - CHAIMAE: 800 invoices`);
    console.log(`  - MULTI: 500 invoices`);
    console.log(`  - TOTAL: 2000 invoices`);
    console.log('\n✅ Ready for migration testing!');
}

// Run if called directly
if (require.main === module) {
    generateTestData().catch(console.error);
}

module.exports = { generateTestData };
