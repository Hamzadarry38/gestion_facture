const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'facture_db',
    password: 'Azer190@',
    port: 5432,
});

async function rebuild() {
    console.log('🔧 حذف الجداول القديمة وإعادة إنشائها...');

    try {
        const client = await pool.connect();
        console.log('✅ Connected to database.');

        // 1. حذف جميع الجداول القديمة
        const dropTables = [
            'benali_devis_numbers', 'benali_pdf_paths',
            'smarts_devis_numbers', 'smarts_pdf_paths',
            'msh3_devis_numbers', 'msh3_pdf_paths',
            'company_pdf_settings'
        ];

        for (const table of dropTables) {
            await client.query(`DROP TABLE IF EXISTS ${table}`);
            console.log(`🗑️  Dropped: ${table}`);
        }

        // 2. إنشاء company_pdf_settings
        await client.query(`
      CREATE TABLE company_pdf_settings (
        id SERIAL PRIMARY KEY,
        company_code VARCHAR(50) NOT NULL UNIQUE,
        percentage NUMERIC(10, 2) DEFAULT 0,
        product_names JSONB DEFAULT '{}',
        updated_at TIMESTAMP DEFAULT NOW()
      )
    `);
        console.log('✅ Created: company_pdf_settings');

        // 3. إنشاء جداول الشركات الثلاث
        const companies = ['benali', 'smarts', 'msh3'];

        for (const company of companies) {
            await client.query(`
        CREATE TABLE ${company}_devis_numbers (
          id SERIAL PRIMARY KEY,
          devis_number VARCHAR(50) NOT NULL,
          year INTEGER NOT NULL,
          used_at TIMESTAMP DEFAULT NOW(),
          UNIQUE(devis_number, year)
        )
      `);

            await client.query(`
        CREATE TABLE ${company}_pdf_paths (
          id SERIAL PRIMARY KEY,
          devis_number VARCHAR(50) NOT NULL,
          year INTEGER NOT NULL,
          file_path TEXT NOT NULL,
          created_by VARCHAR(50),
          created_at TIMESTAMP DEFAULT NOW(),
          UNIQUE(devis_number, year)
        )
      `);

            console.log(`✅ Created: ${company}_devis_numbers + ${company}_pdf_paths`);
        }

        // 4. التحقق النهائي
        console.log('\n🔍 التحقق من الجداول...');
        const allTables = ['company_pdf_settings', ...companies.flatMap(c => [`${c}_devis_numbers`, `${c}_pdf_paths`])];

        for (const table of allTables) {
            const res = await client.query(`
        SELECT column_name FROM information_schema.columns 
        WHERE table_name = $1 ORDER BY ordinal_position
      `, [table]);
            const cols = res.rows.map(r => r.column_name).join(', ');
            console.log(`✅ ${table}: [${cols}]`);
        }

        client.release();
        console.log('\n🏁 تم بنجاح! أعد تشغيل السيرفر الآن.');
        process.exit(0);

    } catch (err) {
        console.error('❌ خطأ:', err.message);
        process.exit(1);
    }
}

rebuild();
