const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'facture_db',
    password: 'Azer190@',
    port: 5432
});

async function checkAdminUser() {
    try {
        console.log('🔍 ========================================');
        console.log('🔍 Checking Admin User Information');
        console.log('🔍 ========================================\n');

        // Check if users table exists
        const tableCheck = await pool.query(`
            SELECT EXISTS (
                SELECT FROM information_schema.tables 
                WHERE table_schema = 'public' 
                AND table_name = 'users'
            );
        `);

        if (!tableCheck.rows[0].exists) {
            console.log('❌ Users table does not exist!');
            await pool.end();
            return;
        }

        console.log('✅ Users table exists\n');

        // Get all users
        const allUsers = await pool.query('SELECT id, name, email, can_auto_validate FROM users ORDER BY id');
        
        console.log('📋 All Users in Database:');
        console.log('=' .repeat(80));
        allUsers.rows.forEach(user => {
            console.log(`ID: ${user.id}`);
            console.log(`Name: ${user.name}`);
            console.log(`Email: ${user.email}`);
            console.log(`Can Auto Validate: ${user.can_auto_validate}`);
            console.log('-'.repeat(80));
        });

        // Find admin user by email
        const adminEmail = 'redouanerrebbahi99@gmail.com';
        const adminUser = await pool.query(
            'SELECT id, name, email, can_auto_validate FROM users WHERE email = $1',
            [adminEmail]
        );

        console.log('\n🔑 Admin User Check:');
        console.log('=' .repeat(80));
        console.log(`Looking for email: ${adminEmail}`);
        
        if (adminUser.rows.length > 0) {
            const admin = adminUser.rows[0];
            console.log('✅ Admin user found!');
            console.log(`   ID: ${admin.id}`);
            console.log(`   Name: ${admin.name}`);
            console.log(`   Email: ${admin.email}`);
            console.log(`   Can Auto Validate: ${admin.can_auto_validate}`);
            
            // Check invoices created by this admin
            console.log('\n📊 Invoices created by Admin:');
            console.log('=' .repeat(80));
            
            const invoices = await pool.query(`
                SELECT 
                    COUNT(*) as total_count,
                    SUM(CASE WHEN validation_status = 'pending' THEN 1 ELSE 0 END) as pending_count,
                    SUM(CASE WHEN validation_status = 'validated' THEN 1 ELSE 0 END) as validated_count
                FROM invoices 
                WHERE created_by_user_id = $1
            `, [admin.id]);

            if (invoices.rows.length > 0) {
                const stats = invoices.rows[0];
                console.log(`Total invoices created by admin: ${stats.total_count}`);
                console.log(`   - Pending: ${stats.pending_count}`);
                console.log(`   - Validated: ${stats.validated_count}`);
            }

            // Show sample invoices
            const sampleInvoices = await pool.query(`
                SELECT id, document_numero, validation_status, created_by_user_id, created_by_user_name
                FROM invoices 
                WHERE created_by_user_id = $1
                ORDER BY id DESC
                LIMIT 5
            `, [admin.id]);

            if (sampleInvoices.rows.length > 0) {
                console.log('\n📄 Sample invoices (last 5):');
                sampleInvoices.rows.forEach(inv => {
                    console.log(`   - ID: ${inv.id}, Numero: ${inv.document_numero}, Status: ${inv.validation_status}, Created by: ${inv.created_by_user_name} (ID: ${inv.created_by_user_id})`);
                });
            }

            console.log('\n✅ RESULT: Admin user ID is: ' + admin.id);
            console.log('💡 Use this ID to exclude admin invoices from notifications');
            
        } else {
            console.log('❌ Admin user NOT found!');
            console.log('💡 The email might be different or the user does not exist');
        }

        console.log('\n' + '='.repeat(80));

    } catch (error) {
        console.error('❌ Error:', error.message);
        console.error(error);
    } finally {
        await pool.end();
    }
}

checkAdminUser();
