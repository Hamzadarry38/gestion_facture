const { Pool } = require('pg');

// Database connection
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'facture_db',
    password: 'Azer190@',
    port: 5432,
});

async function checkSecondaryCompaniesPDFs() {
    console.log('🔍 Checking PDF data for secondary companies...\n');

    const companies = ['skm', 'msh3', 'benali', 'saaiss'];

    try {
        for (const company of companies) {
            console.log(`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
            console.log(`📊 ${company.toUpperCase()}`);
            console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);

            // Check devis_numbers table
            const devisTable = `${company}_devis_numbers`;
            const devisResult = await pool.query(`SELECT * FROM ${devisTable} ORDER BY created_at DESC`);
            console.log(`\n📋 ${devisTable}:`);
            console.log(`   Total records: ${devisResult.rows.length}`);
            if (devisResult.rows.length > 0) {
                console.log(`   Latest 3 records:`);
                devisResult.rows.slice(0, 3).forEach((row, i) => {
                    console.log(`   ${i + 1}. Devis: ${row.devis_number}/${row.year} (ID: ${row.id})`);
                });
            }

            // Check pdf_paths table
            const pdfTable = `${company}_pdf_paths`;
            const pdfResult = await pool.query(`SELECT * FROM ${pdfTable} ORDER BY created_at DESC`);
            console.log(`\n📄 ${pdfTable}:`);
            console.log(`   Total records: ${pdfResult.rows.length}`);
            if (pdfResult.rows.length > 0) {
                console.log(`   Latest 3 records:`);
                pdfResult.rows.slice(0, 3).forEach((row, i) => {
                    console.log(`   ${i + 1}. Devis: ${row.devis_number}/${row.year}`);
                    console.log(`      Path: ${row.file_path}`);
                    console.log(`      Created by: ${row.created_by}`);
                });
            }
        }

        console.log('\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('✅ Check completed!');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    } catch (error) {
        console.error('\n❌ Error:', error.message);
    } finally {
        await pool.end();
    }
}

checkSecondaryCompaniesPDFs();
