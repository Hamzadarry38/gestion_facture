const initSqlJs = require('sql.js');
const fs = require('fs');
const path = require('path');

async function checkAndFixMRY() {
    const SQL = await initSqlJs();

    // Check test_data file
    const testDataPath = path.join(__dirname, 'test_data', 'invoices.db');
    console.log('📂 Checking test_data MRY:', testDataPath);

    if (!fs.existsSync(testDataPath)) {
        console.log('❌ Test data file not found!');
        return;
    }

    const testBuffer = fs.readFileSync(testDataPath);
    const testDb = new SQL.Database(testBuffer);

    const testCount = testDb.exec('SELECT COUNT(*) as count FROM invoices');
    console.log('✅ Test data invoices:', testCount[0].values[0][0]);

    testDb.close();

    // Copy to AppData
    const appDataPath = path.join(process.env.APPDATA, 'gestion-factures', 'invoices.db');
    console.log('\n📋 Copying to:', appDataPath);

    fs.copyFileSync(testDataPath, appDataPath);
    console.log('✅ File copied successfully!');

    // Verify
    const appBuffer = fs.readFileSync(appDataPath);
    const appDb = new SQL.Database(appBuffer);

    const appCount = appDb.exec('SELECT COUNT(*) as count FROM invoices');
    console.log('✅ AppData invoices after copy:', appCount[0].values[0][0]);

    appDb.close();
}

checkAndFixMRY().catch(console.error);
