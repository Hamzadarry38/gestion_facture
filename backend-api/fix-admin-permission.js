const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'facture_db',
    password: 'Azer190@',
    port: 5432
});

async function fixAdminPermission() {
    try {
        console.log('🔧 ========================================');
        console.log('🔧 Fixing Admin Permission');
        console.log('🔧 ========================================\n');

        // Check current status
        console.log('📊 Step 1: Check current admin status');
        console.log('=' .repeat(80));
        
        const beforeUpdate = await pool.query(
            'SELECT id, name, email, can_auto_validate FROM users WHERE email = $1',
            ['redouanerrebbahi99@gmail.com']
        );

        if (beforeUpdate.rows.length === 0) {
            console.log('❌ Admin user not found!');
            await pool.end();
            return;
        }

        const admin = beforeUpdate.rows[0];
        console.log(`Current status:`);
        console.log(`   ID: ${admin.id}`);
        console.log(`   Name: ${admin.name}`);
        console.log(`   Email: ${admin.email}`);
        console.log(`   Can Auto Validate: ${admin.can_auto_validate}`);
        console.log('');

        // Update permission
        console.log('🔧 Step 2: Update can_auto_validate to TRUE');
        console.log('=' .repeat(80));
        
        const updateResult = await pool.query(
            'UPDATE users SET can_auto_validate = TRUE WHERE email = $1 RETURNING id, name, email, can_auto_validate',
            ['redouanerrebbahi99@gmail.com']
        );

        const updatedAdmin = updateResult.rows[0];
        console.log('✅ Permission updated successfully!');
        console.log(`   ID: ${updatedAdmin.id}`);
        console.log(`   Name: ${updatedAdmin.name}`);
        console.log(`   Email: ${updatedAdmin.email}`);
        console.log(`   Can Auto Validate: ${updatedAdmin.can_auto_validate}`);
        console.log('');

        // Verify
        console.log('✅ Step 3: Verify update');
        console.log('=' .repeat(80));
        
        const verify = await pool.query(
            'SELECT id, name, email, can_auto_validate FROM users WHERE email = $1',
            ['redouanerrebbahi99@gmail.com']
        );

        const verifiedAdmin = verify.rows[0];
        if (verifiedAdmin.can_auto_validate === true) {
            console.log('✅ VERIFIED: can_auto_validate is now TRUE');
            console.log('🎉 Admin now has auto-validate permission!');
        } else {
            console.log('❌ FAILED: can_auto_validate is still FALSE');
        }

        console.log('\n' + '='.repeat(80));
        console.log('✅ Fix completed!');
        console.log('='.repeat(80));

    } catch (error) {
        console.error('❌ Error:', error.message);
        console.error(error);
    } finally {
        await pool.end();
    }
}

fixAdminPermission();
