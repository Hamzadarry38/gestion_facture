const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'facture_db',
    password: '123456',
    port: 5432,
});

async function fixSchema() {
    try {
        console.log('🔄 Connecting to database...');

        // 1. Drop the incorrect constraint
        console.log('🗑️ Dropping incorrect constraint global_invoice_bons_global_invoice_id_fkey...');
        await pool.query('ALTER TABLE global_invoice_bons DROP CONSTRAINT IF EXISTS global_invoice_bons_global_invoice_id_fkey');

        // 2. Add the correct constraint
        console.log('🏗️ Adding correct constraint referencing global_invoices(id)...');
        await pool.query('ALTER TABLE global_invoice_bons ADD CONSTRAINT global_invoice_bons_global_invoice_id_fkey FOREIGN KEY (global_invoice_id) REFERENCES global_invoices(id) ON DELETE CASCADE');

        console.log('✅ Schema fixed successfully!');
    } catch (err) {
        console.error('❌ Error fixing schema:', err);
    } finally {
        await pool.end();
    }
}

fixSchema();
