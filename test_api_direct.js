const axios = require('axios');

async function testAttachmentAPI() {
    try {
        console.log('🔵 Testing POST /attachments endpoint directly...\n');

        const testData = {
            invoice_id: 1677,
            filename: 'test_direct.pdf',
            file_type: 'application/pdf',
            file_size: 1024,
            file_path: 'C:/test/path/test.pdf',
            file_data: null
        };

        console.log('📤 Sending:', JSON.stringify(testData, null, 2));

        const response = await axios.post('http://localhost:8001/attachments', testData, {
            headers: { 'Content-Type': 'application/json' }
        });

        console.log('\n✅ Response:', JSON.stringify(response.data, null, 2));

    } catch (error) {
        console.error('\n❌ Error:', error.response?.data || error.message);
    }
}

testAttachmentAPI();
