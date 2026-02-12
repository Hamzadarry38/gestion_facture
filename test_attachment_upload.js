const axios = require('axios');

async function testAttachmentUpload() {
    try {
        console.log('🧪 Testing attachment upload to PostgreSQL...');

        // Test data
        const testData = {
            invoice_id: 1671, // From the logs we saw earlier
            filename: 'test_attachment.pdf',
            file_type: 'application/pdf',
            file_size: 12345,
            file_path: '/path/to/test.pdf'
        };

        console.log('📤 Sending POST request to https://anpe-web-api.ddns.net/facture/attachments');
        console.log('Data:', testData);

        const response = await axios.post('https://anpe-web-api.ddns.net/facture/attachments', testData);

        console.log('✅ Response:', response.data);

        // Now check if it was actually saved
        const { Pool } = require('pg');
        const pool = new Pool({
            user: 'postgres',
            host: 'localhost',
            database: 'facture_db',
            password: process.env.DB_PASSWORD || '123456',
            port: 5432
        });

        const result = await pool.query('SELECT * FROM invoice_attachments WHERE filename = $1', ['test_attachment.pdf']);
        console.log('📊 Database check:', result.rows.length > 0 ? 'FOUND' : 'NOT FOUND');
        if (result.rows.length > 0) {
            console.log('Record:', result.rows[0]);
        }

        await pool.end();

    } catch (error) {
        console.error('❌ Error:', error.message);
        if (error.response) {
            console.error('Response data:', error.response.data);
            console.error('Response status:', error.response.status);
        }
    }
}

testAttachmentUpload();
