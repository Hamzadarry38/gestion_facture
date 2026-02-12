const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'facture_db',
    password: 'Azer190@',
    port: 5432,
});

async function diagnostic() {
    console.log('--- Database Diagnostic ---');
    try {
        const time = await pool.query('SELECT NOW()');
        console.log('✅ Connection to Postgres OK:', time.rows[0].now);

        const tables = await pool.query("SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'");
        console.log('📊 Tables in database:', tables.rows.map(t => t.table_name).join(', '));

        const invoiceCols = await pool.query("SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'invoices'");
        console.log('📄 Invoices columns:', invoiceCols.rows.map(c => c.column_name).join(', '));

        console.log('\n--- Testing /invoices/MRY logic ---');
        const company = 'MRY';
        // Simulate the server query
        const res = await pool.query(`
      SELECT i.*, c.nom as client_nom, c.ice as client_ice 
      FROM invoices i 
      JOIN clients c ON i.client_id = c.id 
      WHERE i.company_code = $1
      ORDER BY i.created_at DESC
    `, [company.toUpperCase()]);
        console.log(`✅ Query successful, found ${res.rows.length} invoices`);

    } catch (err) {
        console.error('❌ Diagnostic FAILED:');
        console.error(err.message);
        if (err.hint) console.error('Hint:', err.hint);
    } finally {
        await pool.end();
    }
}

diagnostic();
