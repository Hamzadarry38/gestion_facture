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

async function runMigration() {
    try {
        const sqlPath = path.join(__dirname, 'update_schema_chaimae.sql');
        const sql = fs.readFileSync(sqlPath, 'utf8');

        console.log('🔄 Applying schema updates...');
        await pool.query(sql);
        console.log('✅ Schema updates applied successfully!');

    } catch (err) {
        console.error('❌ Error applying schema updates:', err);
    } finally {
        await pool.end();
    }
}

runMigration();
