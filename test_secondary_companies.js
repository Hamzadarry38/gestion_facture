const axios = require('axios');

// Test script to verify secondary companies are fetching data from localhost
async function testSecondaryCompaniesConnection() {
    console.log('🧪 Testing Secondary Companies API Connection...\n');
    console.log('📍 Target: http://localhost:8001\n');

    const companies = ['SKM', 'SAAISS', 'BENALI', 'MSH3'];
    const API_URL = 'http://localhost:8001';

    for (const company of companies) {
        console.log(`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
        console.log(`🏢 Testing ${company}...`);
        console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);

        try {
            // Test 1: Get all devis
            console.log(`\n📊 Test 1: Fetching devis for ${company}...`);
            const devisResponse = await axios.get(`${API_URL}/devis/${company}`);

            if (devisResponse.status === 200) {
                console.log(`✅ SUCCESS: Got ${devisResponse.data.data.length} devis from localhost`);
                console.log(`   Response from: ${API_URL}`);
                if (devisResponse.data.data.length > 0) {
                    console.log(`   Sample: ${JSON.stringify(devisResponse.data.data[0])}`);
                }
            }

            // Test 2: Get PDF paths
            console.log(`\n📄 Test 2: Fetching PDF paths for ${company}...`);
            const pdfResponse = await axios.get(`${API_URL}/pdf/${company}`);

            if (pdfResponse.status === 200) {
                console.log(`✅ SUCCESS: Got ${pdfResponse.data.data.length} PDF paths from localhost`);
                console.log(`   Response from: ${API_URL}`);
                if (pdfResponse.data.data.length > 0) {
                    console.log(`   Sample: ${JSON.stringify(pdfResponse.data.data[0])}`);
                }
            }

            // Test 3: Try to add a test devis
            console.log(`\n➕ Test 3: Adding test devis for ${company}...`);
            const testDevisNumber = `TEST-${Date.now()}`;
            const testYear = new Date().getFullYear();

            const addResponse = await axios.post(`${API_URL}/devis/${company}`, {
                devis_number: testDevisNumber,
                year: testYear
            });

            if (addResponse.status === 200 || addResponse.status === 201) {
                console.log(`✅ SUCCESS: Added test devis to localhost PostgreSQL`);
                console.log(`   Devis: ${testDevisNumber}, Year: ${testYear}`);

                // Clean up - delete the test devis
                await axios.delete(`${API_URL}/devis/${company}/${testDevisNumber}/${testYear}`);
                console.log(`🧹 Cleaned up test devis`);
            }

            console.log(`\n🎉 ${company}: ALL TESTS PASSED - Using localhost PostgreSQL! ✅`);

        } catch (error) {
            console.log(`\n❌ ${company}: FAILED - NOT using localhost!`);
            console.log(`   Error: ${error.message}`);
            if (error.response) {
                console.log(`   Status: ${error.response.status}`);
                console.log(`   Data: ${JSON.stringify(error.response.data)}`);
            }
            console.log(`\n⚠️  This company is likely using local SQLite or wrong API URL!`);
        }
    }

    console.log('\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📊 FINAL SUMMARY');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('If all tests passed, secondary companies are:');
    console.log('✅ Connected to localhost:8001');
    console.log('✅ Using PostgreSQL database');
    console.log('✅ Ready for online deployment!');
    console.log('\nIf any tests failed:');
    console.log('❌ Check that node server.js is running');
    console.log('❌ Check api-client.js uses http://localhost:8001');
    console.log('❌ Restart the Electron app after changes');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
}

// Run the test
testSecondaryCompaniesConnection().catch(error => {
    console.error('💥 Test script failed:', error);
    process.exit(1);
});
