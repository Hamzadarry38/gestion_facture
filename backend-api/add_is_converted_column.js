const { Pool } = require('pg');
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'facture_db',
    password: '123456',
    port: 5432,
});

async function migrate() {
    try {
        console.log('🔄 Adding is_converted column to invoices table...');

        // Check if column exists
        const checkRes = await pool.query(`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name='invoices' AND column_name='is_converted'
    `);

        if (checkRes.rows.length === 0) {
            await pool.query(`
        ALTER TABLE invoices 
        ADD COLUMN is_converted BOOLEAN DEFAULT FALSE
      `);
            console.log('✅ Column is_converted added successfully.');
        } else {
            console.log('ℹ️ Column is_converted already exists.');
        }

    } catch (err) {
        console.error('❌ Error adding column:', err);
    } finally {
        await pool.end();
    }
}

migrate();
