const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'facture_db',
    password: 'Azer190@',
    port: 5432
});

async function checkInvoicesTable() {
    try {
        // Check if attachment_count column exists
        const result = await pool.query(`
            SELECT column_name, data_type 
            FROM information_schema.columns 
            WHERE table_name = 'invoices' 
            AND column_name = 'attachment_count'
        `);

        if (result.rows.length > 0) {
            console.log('✅ attachment_count column EXISTS');
            console.log('   Column info:', result.rows[0]);
        } else {
            console.log('❌ attachment_count column DOES NOT EXIST');
        }

        await pool.end();
    } catch (err) {
        console.error('Error:', err.message);
        await pool.end();
    }
}

checkInvoicesTable();
