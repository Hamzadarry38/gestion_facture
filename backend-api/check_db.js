const { Pool } = require('pg');
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'facture_db',
    password: '123456',
    port: 5432,
});

async function check() {
    try {
        console.log('--- USERS IN DB ---');
        const userRes = await pool.query('SELECT id, name, email, can_auto_validate FROM users');
        console.table(userRes.rows);

        console.log('\n--- INVOICE COLUMNS ---');
        const invCols = await pool.query("SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'invoices' ORDER BY ordinal_position");
        console.table(invCols.rows);

        console.log('\n--- GLOBAL_INVOICE COLUMNS ---');
        const globalCols = await pool.query("SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'global_invoices' ORDER BY ordinal_position");
        console.table(globalCols.rows);

        const countRes = await pool.query("SELECT COUNT(*) FROM invoices WHERE validation_status = 'validated'");
        const countPending = await pool.query("SELECT COUNT(*) FROM invoices WHERE validation_status = 'pending'");
        console.log('\n--- INVOICE STATS ---');
        console.log('Validated:', countRes.rows[0].count);
        console.log('Pending:', countPending.rows[0].count);
    } catch (err) {
        console.error('Error:', err);
    } finally {
        await pool.end();
    }
}

check();
