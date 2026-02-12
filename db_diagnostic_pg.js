const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'facture_db',
    password: '123456',
    port: 5432,
});

async function diagnostic() {
    try {
        const time = await pool.query('SELECT NOW()');
        console.log('✅ Connected to Postgres at:', time.rows[0].now);

        const tables = await pool.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `);
        console.log('📊 Tables found:', tables.rows.map(r => r.table_name).join(', '));

        const invoiceCount = await pool.query('SELECT COUNT(*) FROM invoices');
        console.log('📄 Total Invoices:', invoiceCount.rows[0].count);

        if (invoiceCount.rows[0].count > 0) {
            const sample = await pool.query('SELECT id, company_code, document_type, document_numero FROM invoices LIMIT 5');
            console.log('🧪 Sample Invoices:');
            console.table(sample.rows);
        }

        const clientCount = await pool.query('SELECT COUNT(*) FROM clients');
        console.log('👥 Total Clients:', clientCount.rows[0].count);

    } catch (err) {
        console.error('❌ Diagnostic failed:', err.message);
    } finally {
        await pool.end();
    }
}

diagnostic();
