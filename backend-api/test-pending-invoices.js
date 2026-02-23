const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'facture_db',
    password: '123456',
    port: 5432,
});

async function testPendingInvoices() {
    try {
        console.log('🔍 ========================================');
        console.log('🔍 Testing Pending Invoices Logic');
        console.log('🔍 ========================================\n');

        // Test 1: Get all pending invoices
        console.log('📊 Test 1: All pending invoices');
        const allPending = await pool.query(`
            SELECT id, document_numero, document_type, validation_status, 
                   created_by_user_id, created_by_user_name, company_code
            FROM invoices 
            WHERE validation_status = 'pending'
            ORDER BY id DESC 
            LIMIT 20
        `);
        console.log(`✅ Found ${allPending.rows.length} pending invoices`);
        console.log('Sample data:', JSON.stringify(allPending.rows.slice(0, 3), null, 2));
        console.log('');

        // Test 2: Get pending invoices for MRY
        console.log('📊 Test 2: Pending invoices for MRY');
        const mryPending = await pool.query(`
            SELECT id, document_numero, validation_status, 
                   created_by_user_id, created_by_user_name
            FROM invoices 
            WHERE validation_status = 'pending'
            AND company_code = 'MRY'
            ORDER BY id DESC 
            LIMIT 10
        `);
        console.log(`✅ Found ${mryPending.rows.length} pending MRY invoices`);
        console.log('Data:', JSON.stringify(mryPending.rows, null, 2));
        console.log('');

        // Test 3: Get pending invoices excluding user_id = 1
        console.log('📊 Test 3: Pending invoices EXCLUDING user_id = 1');
        const excludedPending = await pool.query(`
            SELECT id, document_numero, validation_status, 
                   created_by_user_id, created_by_user_name, company_code
            FROM invoices 
            WHERE validation_status = 'pending'
            AND (created_by_user_id IS NULL OR created_by_user_id != $1)
            ORDER BY id DESC 
            LIMIT 10
        `, [1]);
        console.log(`✅ Found ${excludedPending.rows.length} pending invoices (excluding user 1)`);
        console.log('Data:', JSON.stringify(excludedPending.rows, null, 2));
        console.log('');

        // Test 4: Statistics by user
        console.log('📊 Test 4: Statistics by user');
        const stats = await pool.query(`
            SELECT 
                created_by_user_id,
                created_by_user_name,
                company_code,
                COUNT(*) as count
            FROM invoices 
            WHERE validation_status = 'pending'
            GROUP BY created_by_user_id, created_by_user_name, company_code
            ORDER BY count DESC
        `);
        console.log(`✅ Statistics for ${stats.rows.length} users`);
        console.log('Stats:', JSON.stringify(stats.rows, null, 2));
        console.log('');

        // Test 5: Check if created_by_user_id column exists
        console.log('📊 Test 5: Check schema');
        const schema = await pool.query(`
            SELECT column_name, data_type, is_nullable
            FROM information_schema.columns 
            WHERE table_name = 'invoices' 
            AND column_name IN ('created_by_user_id', 'created_by_user_name', 'validation_status')
            ORDER BY column_name
        `);
        console.log('✅ Schema check:');
        console.log(JSON.stringify(schema.rows, null, 2));
        console.log('');

        // Test 6: Comparison
        console.log('📊 Test 6: Comparison Summary');
        console.log(`Total pending invoices: ${allPending.rows.length}`);
        console.log(`MRY pending invoices: ${mryPending.rows.length}`);
        console.log(`Pending excluding user 1: ${excludedPending.rows.length}`);
        console.log(`Difference (user 1's invoices): ${allPending.rows.length - excludedPending.rows.length}`);
        console.log('');

        // Test 7: Show invoices created by user 1
        console.log('📊 Test 7: Invoices created by user_id = 1');
        const user1Invoices = await pool.query(`
            SELECT id, document_numero, validation_status, 
                   created_by_user_id, created_by_user_name, company_code
            FROM invoices 
            WHERE validation_status = 'pending'
            AND created_by_user_id = 1
            ORDER BY id DESC 
            LIMIT 10
        `);
        console.log(`✅ Found ${user1Invoices.rows.length} invoices created by user 1`);
        console.log('Data:', JSON.stringify(user1Invoices.rows, null, 2));
        console.log('');

        console.log('🎉 ========================================');
        console.log('🎉 All tests completed successfully!');
        console.log('🎉 ========================================');

    } catch (err) {
        console.error('❌ Error during testing:', err);
        console.error('Error details:', err.message);
        console.error('Stack trace:', err.stack);
    } finally {
        await pool.end();
    }
}

testPendingInvoices();
