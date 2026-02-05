const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'facture_db',
    password: '123456',
    port: 5432,
});

async function migrate() {
    const client = await pool.connect();
    try {
        console.log('🚀 Starting migration: Adding creation_method column...');

        // Add creation_method column
        await client.query(`
      ALTER TABLE invoices 
      ADD COLUMN IF NOT EXISTS creation_method VARCHAR(20) DEFAULT 'normal'
    `);
        console.log('✅ Column creation_method added successfully');

        // Update existing invoices to have 'normal' as default
        const result = await client.query(`
      UPDATE invoices 
      SET creation_method = 'normal' 
      WHERE creation_method IS NULL
    `);
        console.log(`✅ Updated ${result.rowCount} existing invoices with default 'normal' value`);

        console.log('✅ Migration completed successfully!');
    } catch (error) {
        if (error.message.includes('already exists')) {
            console.log('ℹ️ Column creation_method already exists, skipping...');
        } else {
            console.error('❌ Migration failed:', error.message);
            throw error;
        }
    } finally {
        client.release();
        await pool.end();
    }
}

migrate()
    .then(() => {
        console.log('Done!');
        process.exit(0);
    })
    .catch((error) => {
        console.error('Error:', error);
        process.exit(1);
    });
