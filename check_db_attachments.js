const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'facture_db',
    password: '123456',
    port: 5432
});

async function checkAttachments() {
    try {
        console.log('📊 Checking invoice_attachments table...\n');

        const result = await pool.query('SELECT id, invoice_id, filename, file_size, file_path, created_at FROM invoice_attachments ORDER BY id DESC LIMIT 10');

        if (result.rows.length === 0) {
            console.log('❌ NO ATTACHMENTS FOUND IN DATABASE');
        } else {
            console.log(`✅ Found ${result.rows.length} attachments:\n`);
            result.rows.forEach(r => {
                console.log(`  ID: ${r.id}`);
                console.log(`  Invoice: ${r.invoice_id}`);
                console.log(`  File: ${r.filename}`);
                console.log(`  Size: ${r.file_size} bytes`);
                console.log(`  Path: ${r.file_path}`);
                console.log(`  Created: ${r.created_at}`);
                console.log('  ---');
            });
        }

        await pool.end();
    } catch (err) {
        console.error('Error:', err.message);
        await pool.end();
    }
}

checkAttachments();
