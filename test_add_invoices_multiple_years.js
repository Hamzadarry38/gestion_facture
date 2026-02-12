// Script to add test invoices for multiple years
// This helps test the year selector functionality

const fs = require('fs');
const path = require('path');
const initSqlJs = require('sql.js');

console.log('📊 Starting to add test invoices for multiple years...\n');

let db;

async function initDatabase() {
    const SQL = await initSqlJs();
    const dbPath = path.join(__dirname, 'database', 'chaimae_invoices.db');
    
    if (fs.existsSync(dbPath)) {
        const buffer = fs.readFileSync(dbPath);
        db = new SQL.Database(buffer);
        console.log('✅ Database loaded successfully\n');
    } else {
        console.error('❌ Database file not found!');
        process.exit(1);
    }
}

function saveDatabase() {
    const dbPath = path.join(__dirname, 'database', 'chaimae_invoices.db');
    const data = db.export();
    const buffer = Buffer.from(data);
    fs.writeFileSync(dbPath, buffer);
    console.log('💾 Database saved successfully');
}

// Function to add test invoices for a specific year
function addTestInvoicesForYear(year, count) {
    console.log(`\n📅 Adding ${count} test invoices for year ${year}...`);
    
    // Get or create a test client
    let result = db.exec('SELECT id FROM clients WHERE nom = "Client Test"');
    let clientId;
    
    if (result.length === 0 || result[0].values.length === 0) {
        db.run('INSERT INTO clients (nom, ice) VALUES (?, ?)', ['Client Test', 'ICE123456789']);
        result = db.exec('SELECT last_insert_rowid()');
        clientId = result[0].values[0][0];
        console.log(`✅ Created test client with ID: ${clientId}`);
    } else {
        clientId = result[0].values[0][0];
        console.log(`✅ Using existing test client with ID: ${clientId}`);
    }
    
    // Get next sequential_id for this year
    let seqResult = db.exec(`SELECT MAX(sequential_id) as max_seq FROM invoices WHERE year = ${year}`);
    let nextSeqId = 1;
    if (seqResult.length > 0 && seqResult[0].values.length > 0 && seqResult[0].values[0][0] !== null) {
        nextSeqId = seqResult[0].values[0][0] + 1;
    }
    
    // Add invoices
    for (let i = 0; i < count; i++) {
        const month = Math.floor(Math.random() * 12) + 1;
        const day = Math.floor(Math.random() * 28) + 1;
        const date = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        
        const docTypes = ['facture', 'devis', 'bon_livraison'];
        const docType = docTypes[Math.floor(Math.random() * docTypes.length)];
        
        const numero = `${docType.toUpperCase()}-${nextSeqId}/${year}`;
        
        const totalHT = Math.floor(Math.random() * 50000) + 1000;
        const tvaRate = 20;
        const montantTVA = totalHT * (tvaRate / 100);
        const totalTTC = totalHT + montantTVA;
        
        db.run(`
            INSERT INTO invoices (
                client_id, document_type, document_date,
                document_numero, year, sequential_id,
                total_ht, tva_rate, montant_tva, total_ttc
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `, [clientId, docType, date, numero, year, nextSeqId, totalHT, tvaRate, montantTVA, totalTTC]);
        
        console.log(`  ✅ Added ${docType} #${nextSeqId} for ${date}`);
        nextSeqId++;
    }
    
    console.log(`\n✅ Successfully added ${count} invoices for year ${year}`);
}

// Main function
async function main() {
    try {
        await initDatabase();
        
        // Add invoices for 2023
        addTestInvoicesForYear(2023, 5);
        
        // Add invoices for 2024
        addTestInvoicesForYear(2024, 8);
        
        // Add invoices for 2025
        addTestInvoicesForYear(2025, 10);
        
        // Add invoices for 2026 (future year for testing)
        addTestInvoicesForYear(2026, 6);
        
        // Add invoices for 2027 (future year for testing)
        addTestInvoicesForYear(2027, 3);
        
        // Save database
        saveDatabase();
        
        console.log('\n\n🎉 SUCCESS! Test invoices added for years: 2023, 2024, 2025, 2026, 2027');
        console.log('\n📊 Summary:');
        
        // Show summary
        const summary = db.exec(`
            SELECT year, COUNT(*) as count 
            FROM invoices 
            GROUP BY year 
            ORDER BY year DESC
        `);
        
        if (summary.length > 0) {
            console.log('\nInvoices per year:');
            summary[0].values.forEach(row => {
                console.log(`  ${row[0]}: ${row[1]} documents`);
            });
        }
        
        console.log('\n✅ You can now test the year selector with multiple years!');
        console.log('💡 Run "npm run dev" to see the year selector in action.');
        
        db.close();
        
    } catch (error) {
        console.error('❌ Error adding test invoices:', error);
        if (db) db.close();
        process.exit(1);
    }
}

// Run the script
main();
