const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'facture_db',
    password: process.env.DB_PASSWORD || '123456',
    port: 5432,
});

async function updateSchema() {
    console.log('🚀 Starting PostgreSQL schema update...');

    try {
        // 1. Add creation_method to invoices
        console.log('📝 Adding creation_method column to invoices...');
        await pool.query("ALTER TABLE invoices ADD COLUMN IF NOT EXISTS creation_method TEXT DEFAULT 'normal';");

        // 2. Create tables for secondary companies (SAAISS, SmartS, MSH3, BenAli, SKM)
        const companies = ['SAAISS', 'SMARTS', 'MSH3', 'BENALI', 'SKM'];

        for (const company of companies) {
            const lowerCompany = company.toLowerCase();
            console.log(`📝 Creating tables for ${company}...`);

            // Devis numbers table
            await pool.query(`
        CREATE TABLE IF NOT EXISTS ${lowerCompany}_devis_numbers (
          id SERIAL PRIMARY KEY,
          devis_number TEXT NOT NULL,
          year INTEGER NOT NULL,
          company_code TEXT DEFAULT '${company}',
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          used_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          UNIQUE(devis_number, year)
        );
      `);

            // PDF files table
            await pool.query(`
        CREATE TABLE IF NOT EXISTS ${lowerCompany}_pdf_files (
          id SERIAL PRIMARY KEY,
          devis_number TEXT NOT NULL,
          year INTEGER NOT NULL,
          file_path TEXT NOT NULL,
          created_by TEXT DEFAULT 'Unknown',
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          UNIQUE(devis_number, year)
        );
      `);

            console.log(`✅ Tables for ${company} created/verified.`);
        }

        console.log('✨ All schema updates completed successfully!');
    } catch (err) {
        console.error('❌ Error updating schema:', err.message);
    } finally {
        await pool.end();
    }
}

updateSchema();
