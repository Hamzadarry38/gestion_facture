const { Pool } = require('pg');

const pgConfig = {
    user: 'postgres',
    host: 'localhost',
    database: 'facture_db',
    password: 'Azer190@',
    port: 5432
};

async function repairAttribution() {
    const pool = new Pool(pgConfig);
    const adminEmail = 'redouanerrebbahi99@gmail.com';

    try {
        console.log(`🔄 Looking up admin user (${adminEmail})...`);
        const adminRes = await pool.query("SELECT id, name, email FROM users WHERE email = $1", [adminEmail]);

        if (adminRes.rows.length === 0) {
            console.error('❌ Admin user not found in database.');
            return;
        }

        const admin = adminRes.rows[0];
        console.log(`✅ Found Admin: ${admin.name} (ID: ${admin.id})`);

        // Repair ALL invoices missing creator info
        console.log('🔄 Repairing invoices with missing creator info...');
        const repairResult = await pool.query(
            `UPDATE invoices 
             SET created_by_user_id = $1, 
                 created_by_user_name = $2, 
                 created_by_user_email = $3,
                 created_by = $2
             WHERE created_by_user_name IS NULL 
                OR created_by_user_name = '' 
                OR created_by_user_name = '-'`,
            [admin.id, admin.name, admin.email]
        );
        console.log(`✅ Repaired ${repairResult.rowCount} invoices.`);

        console.log('🎉 Attribution repair completed!');
    } catch (error) {
        console.error('❌ Error:', error);
    } finally {
        await pool.end();
    }
}

repairAttribution();
