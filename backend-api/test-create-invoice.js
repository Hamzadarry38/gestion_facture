const { Pool } = require('pg');
const http = require('http');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'facture_db',
    password: 'Azer190@',
    port: 5432
});

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

async function testCreateInvoice() {
    try {
        console.log('🧪 ========================================');
        console.log('🧪 Test: Create Invoice & Check Notifications');
        console.log('🧪 ========================================\n');

        // Step 1: Check pending invoices BEFORE creating
        console.log('📊 Step 1: Check pending invoices BEFORE creating new invoice');
        console.log('=' .repeat(80));
        
        const beforeAll = await makeRequest(`${API_BASE}/invoices/pending?company_code=MRY`);
        const beforeFiltered = await makeRequest(`${API_BASE}/invoices/pending?company_code=MRY&user_id=1`);
        
        console.log(`Total pending (no filter): ${beforeAll.data?.length || 0}`);
        console.log(`Pending excluding user 1: ${beforeFiltered.data?.length || 0}`);
        console.log('');

        // Step 2: Create a new test invoice
        console.log('📝 Step 2: Creating new test invoice...');
        console.log('=' .repeat(80));
        
        const insertResult = await pool.query(`
            INSERT INTO invoices (
                company_code,
                client_id,
                document_type,
                document_numero,
                document_date,
                total_ht,
                tva_rate,
                montant_tva,
                total_ttc,
                validation_status,
                created_by_user_id,
                created_by_user_name,
                created_by_user_email,
                year,
                created_at,
                updated_at
            ) VALUES (
                'MRY',
                1,
                'facture',
                'TEST-' || EXTRACT(EPOCH FROM NOW())::TEXT,
                CURRENT_DATE,
                1000.00,
                20,
                200.00,
                1200.00,
                'pending',
                1,
                'REDOUAN ERREBBAHI',
                'redouanerrebbahi99@gmail.com',
                EXTRACT(YEAR FROM CURRENT_DATE),
                NOW(),
                NOW()
            )
            RETURNING id, document_numero, validation_status, created_by_user_id, created_by_user_name
        `);

        const newInvoice = insertResult.rows[0];
        console.log('✅ Invoice created successfully!');
        console.log(`   ID: ${newInvoice.id}`);
        console.log(`   Numero: ${newInvoice.document_numero}`);
        console.log(`   Status: ${newInvoice.validation_status}`);
        console.log(`   Created by: ${newInvoice.created_by_user_name} (ID: ${newInvoice.created_by_user_id})`);
        console.log('');

        // Step 3: Check pending invoices AFTER creating
        console.log('📊 Step 3: Check pending invoices AFTER creating new invoice');
        console.log('=' .repeat(80));
        
        const afterAll = await makeRequest(`${API_BASE}/invoices/pending?company_code=MRY`);
        const afterFiltered = await makeRequest(`${API_BASE}/invoices/pending?company_code=MRY&user_id=1`);
        
        console.log(`Total pending (no filter): ${afterAll.data?.length || 0}`);
        console.log(`Pending excluding user 1: ${afterFiltered.data?.length || 0}`);
        console.log('');

        // Step 4: Analysis
        console.log('📋 Step 4: Analysis');
        console.log('=' .repeat(80));
        
        const totalBefore = beforeAll.data?.length || 0;
        const totalAfter = afterAll.data?.length || 0;
        const filteredBefore = beforeFiltered.data?.length || 0;
        const filteredAfter = afterFiltered.data?.length || 0;

        console.log(`Before: ${totalBefore} total, ${filteredBefore} excluding user 1`);
        console.log(`After:  ${totalAfter} total, ${filteredAfter} excluding user 1`);
        console.log('');

        if (totalAfter > totalBefore) {
            console.log('✅ New invoice appears in total pending count (+1)');
        } else {
            console.log('❌ New invoice NOT in total count (unexpected!)');
        }

        if (filteredAfter === filteredBefore) {
            console.log('✅ New invoice EXCLUDED from user 1 notifications (CORRECT!)');
            console.log('🎉 Badge should NOT show for admin!');
        } else {
            console.log('❌ New invoice APPEARS in user 1 notifications (PROBLEM!)');
            console.log('⚠️  Badge WILL show for admin (needs fix)');
        }

        console.log('');
        console.log('🧹 Step 5: Cleanup - Deleting test invoice...');
        await pool.query('DELETE FROM invoices WHERE id = $1', [newInvoice.id]);
        console.log('✅ Test invoice deleted');

        console.log('\n' + '='.repeat(80));
        console.log('✅ Test completed!');
        console.log('='.repeat(80));

    } catch (error) {
        console.error('❌ Error:', error.message);
        console.error(error);
    } finally {
        await pool.end();
    }
}

testCreateInvoice();
