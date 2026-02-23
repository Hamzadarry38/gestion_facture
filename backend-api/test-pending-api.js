const http = require('http');

const API_BASE = 'http://localhost:8001';

function makeRequest(url) {
    return new Promise((resolve, reject) => {
        http.get(url, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try {
                    resolve(JSON.parse(data));
                } catch (e) {
                    resolve(data);
                }
            });
        }).on('error', reject);
    });
}

async function testPendingAPI() {
    try {
        console.log('🔍 ========================================');
        console.log('🔍 Testing /invoices/pending API Endpoint');
        console.log('🔍 ========================================\n');

        // Test 1: Get ALL pending invoices (no user_id filter)
        console.log('📊 Test 1: ALL pending invoices (no user_id filter)');
        const test1 = await makeRequest(`${API_BASE}/invoices/pending?company_code=MRY`);
        console.log(`✅ Count: ${test1.data ? test1.data.length : 0}`);
        if (test1.data) {
            test1.data.forEach(inv => {
                console.log(`   - ID: ${inv.id}, Numero: ${inv.document_numero}, CreatedBy: ${inv.created_by_user_id} (${inv.created_by_user_name})`);
            });
        }
        console.log('');

        // Test 2: Get pending invoices EXCLUDING user_id=1
        console.log('📊 Test 2: Pending invoices EXCLUDING user_id=1');
        const test2 = await makeRequest(`${API_BASE}/invoices/pending?company_code=MRY&user_id=1`);
        console.log(`✅ Count: ${test2.data ? test2.data.length : 0}`);
        if (test2.data && test2.data.length > 0) {
            test2.data.forEach(inv => {
                console.log(`   - ID: ${inv.id}, Numero: ${inv.document_numero}, CreatedBy: ${inv.created_by_user_id} (${inv.created_by_user_name})`);
            });
        } else {
            console.log('   ✅ No pending invoices for other users - Badge should NOT show!');
        }
        console.log('');

        // Test 3: Same for CHAIMAE
        console.log('📊 Test 3: CHAIMAE pending (no filter)');
        const test3a = await makeRequest(`${API_BASE}/invoices/pending?company_code=CHAIMAE`);
        console.log(`✅ Count: ${test3a.data ? test3a.data.length : 0}`);
        if (test3a.data) {
            test3a.data.forEach(inv => {
                console.log(`   - ID: ${inv.id}, Numero: ${inv.document_numero}, CreatedBy: ${inv.created_by_user_id} (${inv.created_by_user_name})`);
            });
        }

        console.log('📊 Test 3b: CHAIMAE pending EXCLUDING user_id=1');
        const test3b = await makeRequest(`${API_BASE}/invoices/pending?company_code=CHAIMAE&user_id=1`);
        console.log(`✅ Count: ${test3b.data ? test3b.data.length : 0}`);
        if (test3b.data && test3b.data.length > 0) {
            test3b.data.forEach(inv => {
                console.log(`   - ID: ${inv.id}, Numero: ${inv.document_numero}, CreatedBy: ${inv.created_by_user_id} (${inv.created_by_user_name})`);
            });
        } else {
            console.log('   ✅ No pending invoices for other users - Badge should NOT show!');
        }
        console.log('');

        // Test 4: Same for MULTI
        console.log('📊 Test 4: MULTI pending (no filter)');
        const test4a = await makeRequest(`${API_BASE}/invoices/pending?company_code=MULTI`);
        console.log(`✅ Count: ${test4a.data ? test4a.data.length : 0}`);

        console.log('📊 Test 4b: MULTI pending EXCLUDING user_id=1');
        const test4b = await makeRequest(`${API_BASE}/invoices/pending?company_code=MULTI&user_id=1`);
        console.log(`✅ Count: ${test4b.data ? test4b.data.length : 0}`);
        console.log('');

        // Summary
        console.log('📋 ========================================');
        console.log('📋 SUMMARY');
        console.log('📋 ========================================');
        console.log(`MRY:     ${test1.data?.length || 0} total pending → ${test2.data?.length || 0} after excluding user 1`);
        console.log(`CHAIMAE: ${test3a.data?.length || 0} total pending → ${test3b.data?.length || 0} after excluding user 1`);
        console.log(`MULTI:   ${test4a.data?.length || 0} total pending → ${test4b.data?.length || 0} after excluding user 1`);
        console.log('');

        const totalBefore = (test1.data?.length || 0) + (test3a.data?.length || 0) + (test4a.data?.length || 0);
        const totalAfter = (test2.data?.length || 0) + (test3b.data?.length || 0) + (test4b.data?.length || 0);

        if (totalAfter === 0) {
            console.log('🎉 RESULT: No badges should appear for user 1 (Admin)!');
        } else {
            console.log(`⚠️ RESULT: ${totalAfter} badges will still appear (from other users)`);
        }

    } catch (err) {
        console.error('❌ Error:', err.message);
        console.error('💡 Make sure the server is running: node server.js');
    }
}

testPendingAPI();
