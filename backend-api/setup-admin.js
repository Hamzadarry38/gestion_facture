const { Pool } = require('pg');

// Database connection
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'facture_db',
  password: '123456',
  port: 5432,
});

async function setupAdmin() {
  try {
    console.log('🔧 Starting setup...');

    // Step 1: Add can_auto_validate column
    console.log('📝 Adding can_auto_validate column...');
    await pool.query(`
      ALTER TABLE users 
      ADD COLUMN IF NOT EXISTS can_auto_validate BOOLEAN DEFAULT FALSE
    `);
    console.log('✅ Column added successfully');

    // Step 2: Create admin user (password: admin123)
    console.log('👤 Creating admin user...');
    const hashedPassword = '240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9'; // admin123
    
    await pool.query(`
      INSERT INTO users (name, email, password, can_auto_validate, created_at) 
      VALUES ($1, $2, $3, $4, NOW())
      ON CONFLICT (email) 
      DO UPDATE SET can_auto_validate = true
    `, ['Admin Test', 'admin@test.com', hashedPassword, true]);
    
    console.log('✅ Admin user created successfully');
    console.log('');
    console.log('📋 Login credentials:');
    console.log('   Email: admin@test.com');
    console.log('   Password: admin123');
    console.log('');

    // Step 3: Verify users
    console.log('👥 Current users:');
    const result = await pool.query('SELECT id, name, email, can_auto_validate FROM users ORDER BY id');
    console.table(result.rows);

    console.log('');
    console.log('✅ Setup completed successfully!');
    console.log('🚀 Now run: npm run dev');
    
    process.exit(0);
  } catch (err) {
    console.error('❌ Error:', err.message);
    process.exit(1);
  }
}

setupAdmin();
