const { Pool } = require('pg');
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'facture_db',
    password: '123456',
    port: 5432,
});

async function fix() {
    try {
        console.log('🔄 Resetting user permissions...');

        // Set can_auto_validate to false for everyone except the main admin
        const result = await pool.query(`
      UPDATE users 
      SET can_auto_validate = FALSE 
      WHERE email != $1
    `, ['redouanerrebbahi99@gmail.com']);

        console.log(`✅ Permissions reset for ${result.rowCount} users.`);

        const users = await pool.query('SELECT name, email, can_auto_validate FROM users');
        console.table(users.rows);

    } catch (err) {
        console.error('❌ Error fixing permissions:', err);
    } finally {
        await pool.end();
    }
}

fix();
