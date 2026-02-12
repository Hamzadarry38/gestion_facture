const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'facture_db',
    password: 'Azer190@',
    port: 5432,
});

async function setup() {
    try {
        const sql = fs.readFileSync(path.join(__dirname, 'create_global_invoices_tables.sql'), 'utf8');
        console.log('🚀 Executing SQL migration...');
        await pool.query(sql);
        console.log('✅ Global Invoice tables created successfully!');
    } catch (err) {
        console.error('❌ Error executing SQL:', err);
    } finally {
        await pool.end();
    }
}

setup();
