const { Pool } = require('pg');

// Configuration matches server.js
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'facture_db',
    password: '123456',
    port: 5432,
});

async function verifyTables() {
    const tables = [
        'company_pdf_settings',
        'benali_devis_numbers', 'benali_pdf_paths',
        'smarts_devis_numbers', 'smarts_pdf_paths',
        'msh3_devis_numbers', 'msh3_pdf_paths'
    ];

    console.log('🔍 Checking database tables...');

    try {
        const client = await pool.connect();
        console.log('✅ Connected to database successfully.');

        for (const table of tables) {
            const res = await client.query(`
        SELECT EXISTS (
          SELECT FROM information_schema.tables 
          WHERE table_schema = 'public' 
          AND table_name = $1
        );
      `, [table]);

            if (res.rows[0].exists) {
                console.log(`✅ Table '${table}' EXISTS.`);
            } else {
                console.error(`❌ Table '${table}' DOES NOT EXIST! (Run server to create it)`);
            }
        }

        client.release();
        console.log('\n🏁 Verification complete.');
        process.exit(0);

    } catch (err) {
        console.error('❌ Connection error:', err.message);
        process.exit(1);
    }
}

verifyTables();
