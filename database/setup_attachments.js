const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'facture_db',
    password: '123456',
    port: 5432,
});

async function setup() {
    try {
        console.log('--- Initializing Attachments Table ---');

        // 1. Create the table
        await pool.query(`
            CREATE TABLE IF NOT EXISTS invoice_attachments (
                id SERIAL PRIMARY KEY,
                invoice_id INTEGER REFERENCES invoices(id) ON DELETE CASCADE,
                filename VARCHAR(255) NOT NULL,
                file_type VARCHAR(100),
                file_size INTEGER,
                file_path TEXT,
                file_data BYTEA,
                created_at TIMESTAMP DEFAULT NOW()
            );
        `);
        console.log('✅ invoice_attachments table ready.');

        // 2. Add attachment_count to invoices if missing (cached for performance)
        await pool.query(`
            ALTER TABLE invoices ADD COLUMN IF NOT EXISTS attachment_count INTEGER DEFAULT 0;
        `);
        console.log('✅ attachment_count column ensured in invoices table.');

        console.log('--- Database Setup Completed ---');
    } catch (err) {
        console.error('❌ Database Setup Failed:', err);
    } finally {
        await pool.end();
    }
}

setup();
