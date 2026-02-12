const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'facture_db',
    password: 'Azer190@',
    port: 5432,
});

async function migrate() {
    const client = await pool.connect();
    try {
        console.log('--- Starting Migration ---');

        // 1. Add can_auto_validate and validation_status columns if they don't exist
        await client.query(`
      ALTER TABLE users ADD COLUMN IF NOT EXISTS can_auto_validate BOOLEAN DEFAULT FALSE;
      ALTER TABLE invoices ADD COLUMN IF NOT EXISTS validation_status VARCHAR DEFAULT 'validated';
    `);
        console.log('✅ Columns added or already exist.');

        // 2. Set redouanerrebbahi99@gmail.com as the super user who can auto-validate
        const adminEmail = 'redouanerrebbahi99@gmail.com';
        const updateSuperUser = await client.query(`
      UPDATE users SET can_auto_validate = TRUE WHERE email = $1 RETURNING id;
    `, [adminEmail]);
        if (updateSuperUser.rows.length > 0) {
            console.log(`✅ User ${adminEmail} updated with auto-validation permissions.`);
        } else {
            console.log(`⚠️ User ${adminEmail} not found in database.`);
        }

        // 3. Ensure all existing invoices are marked as validated
        await client.query(`
      UPDATE invoices SET validation_status = 'validated' WHERE validation_status IS NULL;
    `);
        console.log('✅ Existing invoices updated to validated.');

        console.log('--- Migration Completed Successfully ---');
    } catch (err) {
        console.error('❌ Migration Failed:', err);
    } finally {
        client.release();
        await pool.end();
    }
}

migrate();
