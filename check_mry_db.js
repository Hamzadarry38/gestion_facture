const initSqlJs = require('sql.js');
const fs = require('fs');
const path = require('path');

async function checkMRYDatabase() {
    const SQL = await initSqlJs();
    const dbPath = path.join(process.env.APPDATA, 'gestion-factures', 'invoices.db');

    console.log('📂 Checking MRY database:', dbPath);

    if (!fs.existsSync(dbPath)) {
        console.log('❌ Database file not found!');
        return;
    }

    const fileBuffer = fs.readFileSync(dbPath);
    const db = new SQL.Database(fileBuffer);

    // Check invoices table structure
    console.log('\n📊 Invoices table structure:');
    const structure = db.exec('PRAGMA table_info(invoices)');
    if (structure.length > 0) {
        console.log('Columns:', structure[0].values.map(v => v[1]));
    }

    // Count invoices
    console.log('\n📈 Invoice count:');
    const count = db.exec('SELECT COUNT(*) as count FROM invoices');
    if (count.length > 0) {
        console.log('Total invoices:', count[0].values[0][0]);
    }

    // Show first 3 invoices
    console.log('\n📄 First 3 invoices:');
    const invoices = db.exec('SELECT * FROM invoices LIMIT 3');
    if (invoices.length > 0) {
        console.log('Columns:', invoices[0].columns);
        console.log('Data:', invoices[0].values);
    } else {
        console.log('No invoices found!');
    }

    db.close();
}

checkMRYDatabase().catch(console.error);
