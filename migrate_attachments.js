const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'facture_db',
    password: process.env.DB_PASSWORD || '123456',
    port: 5432
});

async function migrate() {
    try {
        console.log('📦 Starting Migration from attachments to invoice_attachments...\n');

        // Check if source table has data
        const source = await pool.query('SELECT * FROM attachments');
        console.log(`📊 Found ${source.rows.length} records in attachments table.`);

        if (source.rows.length > 0) {
            for (const row of source.rows) {
                // Check if already exists in target (by ID or filename/invoice)
                const exists = await pool.query('SELECT id FROM invoice_attachments WHERE filename = $1 AND invoice_id = $2', [row.filename, row.invoice_id]);

                if (exists.rows.length === 0) {
                    await pool.query(
                        `INSERT INTO invoice_attachments (invoice_id, filename, file_type, file_size, file_path, file_data, created_at)
                         VALUES ($1, $2, $3, $4, $5, $6, $7)`,
                        [row.invoice_id, row.filename, row.file_type, row.file_size, row.file_path, row.file_data, row.created_at || row.uploaded_at || new Date()]
                    );
                    console.log(`✅ Migrated: ${row.filename}`);
                } else {
                    console.log(`⏩ Skipped (already exists): ${row.filename}`);
                }
            }
            console.log('\n✨ Migration completed.');
        } else {
            console.log('ℹ️ Nothing to migrate.');
        }

        await pool.end();
    } catch (err) {
        console.error('❌ Migration Error:', err.message);
        await pool.end();
    }
}

migrate();
