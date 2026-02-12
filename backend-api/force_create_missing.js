const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'facture_db',
    password: '123456',
    port: 5432,
});

async function forceCreate() {
    console.log('🔧 Fixing missing tables...');

    try {
        const client = await pool.connect();
        console.log('✅ Connected.');

        // 1. Create company_pdf_settings
        try {
            console.log('👉 Creating company_pdf_settings...');
            await client.query(`
        CREATE TABLE IF NOT EXISTS company_pdf_settings (
          id SERIAL PRIMARY KEY,
          company_code VARCHAR(50) NOT NULL UNIQUE,
          percentage NUMERIC(10, 2) DEFAULT 0,
          product_names JSONB DEFAULT '{}',
          updated_at TIMESTAMP DEFAULT NOW()
        )
      `);
            console.log('✅ company_pdf_settings created.');
        } catch (e) {
            console.error('❌ Failed to create company_pdf_settings:', e.message);
        }

        // 2. Create smarts_pdf_paths
        try {
            console.log('👉 Creating smarts_pdf_paths...');
            await client.query(`
        CREATE TABLE IF NOT EXISTS smarts_pdf_paths (
          id SERIAL PRIMARY KEY,
          devis_number VARCHAR(50) NOT NULL,
          year INTEGER NOT NULL,
          file_path TEXT NOT NULL,
          created_by VARCHAR(50),
          created_at TIMESTAMP DEFAULT NOW()
        )
      `);
            console.log('✅ smarts_pdf_paths created.');
        } catch (e) {
            console.error('❌ Failed to create smarts_pdf_paths:', e.message);
        }

        client.release();
        console.log('🏁 Done. Please run verify_tables.js again.');
        process.exit(0);

    } catch (err) {
        console.error('CRITICAL DATABASE ERROR:', err.message);
        process.exit(1);
    }
}

forceCreate();
