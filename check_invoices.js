const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'facture_db',
    password: '123456',
    port: 5432
});

async function checkInvoices() {
    try {
        const result = await pool.query('SELECT id, document_numero, company_code FROM invoices ORDER BY id DESC LIMIT 5');
        console.log('Recent invoices:');
        result.rows.forEach(r => {
            console.log(`  ID: ${r.id}, Numero: ${r.document_numero}, Company: ${r.company_code}`);
        });
        await pool.end();
    } catch (err) {
        console.error('Error:', err.message);
        await pool.end();
    }
}

checkInvoices();
