const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'facture_db',
    password: '123456',
    port: 5432
});

async function findMissingData() {
    try {
        console.log('🔍 Deep Search for Attachments...\n');

        // Check invoice_attachments
        const res1 = await pool.query('SELECT COUNT(*) FROM invoice_attachments');
        console.log(`📊 Table invoice_attachments: ${res1.rows[0].count} records`);

        // Check the other table mentioned in diagnostics: attachments
        const res2 = await pool.query('SELECT COUNT(*) FROM attachments');
        console.log(`📊 Table attachments: ${res2.rows[0].count} records`);

        // Search for ID 21 specifically in both
        const res3 = await pool.query('SELECT * FROM invoice_attachments WHERE id = 21');
        if (res3.rows.length > 0) console.log('✅ Found ID 21 in invoice_attachments!');

        const res4 = await pool.query('SELECT * FROM attachments WHERE id = 21');
        if (res4.rows.length > 0) console.log('✅ Found ID 21 in attachments!');

        // List all databases to see if there is another one
        const dbs = await pool.query('SELECT datname FROM pg_database WHERE datistemplate = false');
        console.log('\n🗄️ Available Databases:', dbs.rows.map(r => r.datname).join(', '));

        await pool.end();
    } catch (err) {
        console.error('❌ Error:', err.message);
        await pool.end();
    }
}

findMissingData();
