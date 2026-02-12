const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'facture_db',
    password: 'Azer190@',
    port: 5432
});

async function testTransaction() {
    const client = await pool.connect();

    try {
        console.log('🔵 Starting transaction...');
        await client.query('BEGIN');

        console.log('📥 Inserting attachment...');
        const result = await client.query(
            `INSERT INTO invoice_attachments (invoice_id, filename, file_type, file_size, file_path, created_at)
             VALUES ($1, $2, $3, $4, $5, NOW())
             RETURNING id`,
            [1671, 'manual_test.pdf', 'application/pdf', 54321, '/test/path.pdf']
        );

        console.log('✅ Insert successful, ID:', result.rows[0].id);

        console.log('🔄 Updating invoice attachment_count...');
        await client.query(
            'UPDATE invoices SET attachment_count = (SELECT COUNT(*) FROM invoice_attachments WHERE invoice_id = $1) WHERE id = $1',
            [1671]
        );

        console.log('✅ Update successful');

        console.log('💾 Committing transaction...');
        await client.query('COMMIT');

        console.log('✅ Transaction committed successfully');

        // Verify
        const verify = await pool.query('SELECT * FROM invoice_attachments WHERE filename = $1', ['manual_test.pdf']);
        console.log('📊 Verification: Found', verify.rows.length, 'record(s)');

    } catch (err) {
        console.error('❌ Error occurred:', err.message);
        console.error('Full error:', err);
        await client.query('ROLLBACK');
        console.log('🔴 Transaction rolled back');
    } finally {
        client.release();
        await pool.end();
    }
}

testTransaction();
