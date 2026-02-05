const { Pool } = require('pg');

const pgConfig = {
    user: 'postgres',
    host: 'localhost',
    database: 'facture_db',
    password: '123456',
    port: 5432
};

async function fixAttributionV2() {
    const pool = new Pool(pgConfig);
    const targetAdminEmail = 'redouanerrebbahi99@gmail.com';
    try {
        console.log(`🔄 Fetching Admin user (${targetAdminEmail})...`);
        const adminRes = await pool.query("SELECT id, name, email FROM users WHERE email = $1", [targetAdminEmail]);
        let admin = adminRes.rows[0];

        if (!admin) {
            console.log(`⚠️ Admin user (${targetAdminEmail}) not found. Creating temporary admin...`);
            const insertRes = await pool.query(
                "INSERT INTO users (name, email, password, can_auto_validate) VALUES ($1, $2, $3, $4) RETURNING id, name, email",
                ['Admin Redouane', targetAdminEmail, 'admin123', true]
            );
            admin = insertRes.rows[0];
            console.log(`✅ Created Admin: ${admin.name} (ID: ${admin.id})`);
        } else {
            console.log(`✅ Found Admin: ${admin.name} (ID: ${admin.id})`);
            // Ensure permissions are correct
            await pool.query("UPDATE users SET can_auto_validate = true WHERE id = $1", [admin.id]);
        }

        // 1. Update Invoices
        console.log('🔄 Updating invoices attribution to new admin...');
        const invResult = await pool.query(
            `UPDATE invoices 
             SET created_by = $1, 
                 created_by_user_id = $2, 
                 created_by_user_name = $3, 
                 created_by_user_email = $4,
                 validation_status = 'validated'
             WHERE created_by_user_email = $5 OR created_by_user_email IS NULL OR created_by = 'tete'`,
            [admin.email, admin.id, admin.name, admin.email, 'tete@tete.tete']
        );
        console.log(`✅ Updated ${invResult.rowCount} invoices.`);

        // 2. Update Secondary Company PDF Tracks
        const companies = ['SAAISS', 'SMARTS', 'MSH3', 'BENALI', 'SKM'];
        for (const company of companies) {
            const table = `${company.toLowerCase()}_pdf_files`;
            console.log(`🔄 Updating ${table} attribution...`);
            try {
                const res = await pool.query(
                    `UPDATE ${table} SET created_by = $1 WHERE created_by IS NULL OR created_by = 'Unknown' OR created_by = 'Admin' OR created_by = 'tete'`,
                    [admin.name]
                );
                console.log(`✅ Updated ${res.rowCount} records in ${table}.`);
            } catch (e) {
                console.log(`⚠️ Skip ${table}: ${e.message}`);
            }
        }

        console.log('🎉 Admin standardization and attribution fix completed!');
    } catch (error) {
        console.error('❌ Error during fix:', error);
    } finally {
        await pool.end();
    }
}

fixAttributionV2();
