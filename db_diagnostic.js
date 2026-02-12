const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'facture_db',
    password: '123456',
    port: 5432
});

async function diagnostic() {
    try {
        console.log('🔍 Running Database Diagnostic...\n');

        // Check tables
        const tables = await pool.query("SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'");
        console.log('📋 Tables in public schema:', tables.rows.map(r => r.table_name).join(', '));

        // Check columns of invoice_attachments
        const columns = await pool.query("SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'invoice_attachments'");
        console.log('\n📐 Columns in invoice_attachments:');
        columns.rows.forEach(c => console.log(`  - ${c.column_name}: ${c.data_type}`));

        // Check record count
        const count = await pool.query('SELECT COUNT(*) FROM invoice_attachments');
        console.log(`\n🔢 Total records in invoice_attachments: ${count.rows[0].count}`);

        // Try to find the specific ID 21 if it exists
        const lastRec = await pool.query('SELECT * FROM invoice_attachments ORDER BY id DESC LIMIT 5');
        console.log('\n🕒 Last 5 records:');
        if (lastRec.rows.length === 0) {
            console.log('  (Empty)');
        } else {
            lastRec.rows.forEach(r => console.log(`  - ID: ${r.id}, File: ${r.filename}, Invoice: ${r.invoice_id}`));
        }

        await pool.end();
    } catch (err) {
        console.error('❌ Error:', err.message);
        await pool.end();
    }
}

diagnostic();
