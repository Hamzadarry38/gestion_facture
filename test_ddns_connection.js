const axios = require('axios');

async function testDDNSConnection() {
    console.log('🧪 Testing DDNS Connection...\n');

    const urls = [
        'https://redouan.ddns.net/facture/test',
        'https://redouan.ddns.net/facture/test'
    ];

    for (const url of urls) {
        console.log(`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
        console.log(`🌐 Testing: ${url}`);
        console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);

        try {
            const response = await axios.get(url, { timeout: 5000 });
            console.log(`✅ SUCCESS!`);
            console.log(`   Status: ${response.status}`);
            console.log(`   Data: ${JSON.stringify(response.data)}`);
        } catch (error) {
            console.log(`❌ FAILED!`);
            console.log(`   Error: ${error.message}`);
            if (error.code) {
                console.log(`   Code: ${error.code}`);
            }
            if (error.response) {
                console.log(`   Status: ${error.response.status}`);
            }
        }
    }

    console.log('\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📊 DIAGNOSIS');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('If localhost works but DDNS fails:');
    console.log('  → السيرفر يعمل محلياً فقط');
    console.log('  → تحتاج إلى إعداد Reverse Proxy أو Port Forwarding');
    console.log('  → أو استخدام localhost للاختبار المحلي فقط');
    console.log('\nIf both fail:');
    console.log('  → السيرفر غير مشغل (node server.js)');
    console.log('\nIf both work:');
    console.log('  → المشكلة في التطبيق نفسه');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
}

testDDNSConnection().catch(console.error);
