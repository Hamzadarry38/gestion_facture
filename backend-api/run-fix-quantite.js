const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'facture_db',
    password: '123456',
    port: 5432,
});

async function runMigration() {
    try {
        const sqlPath = path.join(__dirname, 'fix_quantite_column.sql');
        const sql = fs.readFileSync(sqlPath, 'utf8');

        console.log('🔄 Fixing quantite column type (DECIMAL -> TEXT)...');
        await pool.query(sql);
        console.log('✅ quantite column changed to TEXT successfully!');

    } catch (err) {
        console.error('❌ Error fixing quantite column:', err);
    } finally {
        await pool.end();
    }
}

runMigration();
