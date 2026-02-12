const { Pool } = require('pg');

// Database connection - UPDATE THESE CREDENTIALS FOR THE PRODUCTION SERVER
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'facture_db',
    password: 'Azer190@',  // UPDATE THIS!
    port: 5432,
});

async function createSecondaryCompaniesTables() {
    console.log('🔧 Creating tables for secondary companies...\n');

    const companies = ['benali', 'skm', 'saaiss', 'msh3'];

    try {
        for (const company of companies) {
            console.log(`\n📊 Creating tables for ${company.toUpperCase()}...`);

            // Create devis_numbers table
            const devisTableSQL = `
                CREATE TABLE IF NOT EXISTS ${company}_devis_numbers (
                    id SERIAL PRIMARY KEY,
                    devis_number VARCHAR(50) NOT NULL,
                    year INTEGER NOT NULL,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    used_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    UNIQUE(devis_number, year)
                );
            `;
            await pool.query(devisTableSQL);
            console.log(`  ✅ Created ${company}_devis_numbers table`);

            // Create pdf_paths table
            const pdfTableSQL = `
                CREATE TABLE IF NOT EXISTS ${company}_pdf_paths (
                    id SERIAL PRIMARY KEY,
                    devis_number VARCHAR(50) NOT NULL,
                    year INTEGER NOT NULL,
                    file_path TEXT NOT NULL,
                    created_by VARCHAR(255) DEFAULT 'Unknown',
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    UNIQUE(devis_number, year)
                );
            `;
            await pool.query(pdfTableSQL);
            console.log(`  ✅ Created ${company}_pdf_paths table`);

            // Create indexes
            await pool.query(`CREATE INDEX IF NOT EXISTS idx_${company}_devis_year ON ${company}_devis_numbers(year, devis_number);`);
            await pool.query(`CREATE INDEX IF NOT EXISTS idx_${company}_pdf_year ON ${company}_pdf_paths(year, devis_number);`);
            console.log(`  ✅ Created indexes for ${company}`);
        }

        console.log('\n\n🎉 All tables created successfully!');
        console.log('\n📊 Summary:');
        console.log('  - benali_devis_numbers ✅');
        console.log('  - benali_pdf_paths ✅');
        console.log('  - skm_devis_numbers ✅');
        console.log('  - skm_pdf_paths ✅');
        console.log('  - saaiss_devis_numbers ✅');
        console.log('  - saaiss_pdf_paths ✅');
        console.log('  - msh3_devis_numbers ✅');
        console.log('  - msh3_pdf_paths ✅');
        console.log('\n✅ Secondary companies are now ready to use PostgreSQL!\n');

    } catch (error) {
        console.error('\n❌ Error creating tables:', error);
        console.error('\nPlease check:');
        console.error('  1. PostgreSQL is running');
        console.error('  2. Database credentials are correct');
        console.error('  3. Database "facture_db" exists');
    } finally {
        await pool.end();
    }
}

createSecondaryCompaniesTables();
