const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'facture_db',
    password: 'Azer190@',
    port: 5432,
});

async function checkConversion() {
    try {
        console.log('--- DIAGNOSTIC: DEVIS CONVERSION ---');

        // 1. Check if column exists
        const colRes = await pool.query(`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'invoices' AND column_name = 'is_converted'
    `);

        if (colRes.rows.length === 0) {
            console.error('❌ CRITICAL: is_converted column DOES NOT EXIST in invoices table!');
            return;
        }
        console.log('✅ is_converted column exists.');

        // 2. Count Devis by status
        const countRes = await pool.query(`
      SELECT 
        company_code,
        COUNT(*) as total_devis,
        COUNT(CASE WHEN is_converted = TRUE THEN 1 END) as converted_count,
        COUNT(CASE WHEN is_converted = FALSE OR is_converted IS NULL THEN 1 END) as not_converted_count
      FROM invoices 
      WHERE document_type = 'devis'
      GROUP BY company_code
    `);

        console.table(countRes.rows);

        // 3. List recent Devis that SHOULD be converted (have a linked facture)
        // This assumes we might link them by checking if another invoice references them
        // But we don't store the reference in the facture usually other than document_numero_devis text
        // Let's check invoices that HAVE document_numero_devis

        console.log('\n--- FACTURES/BL REFERENCING A DEVIS ---');
        const linkedRes = await pool.query(`
      SELECT id, document_type, document_numero, document_numero_devis, company_code 
      FROM invoices 
      WHERE (document_type = 'facture' OR document_type = 'bon_livraison')
      AND document_numero_devis IS NOT NULL 
      AND document_numero_devis != '' 
      ORDER BY id DESC LIMIT 10
    `);
        console.table(linkedRes.rows);

        console.log('\n--- RECENT DEVIS (Checking if numbers are in document_numero or document_numero_devis) ---');
        const sampleDevis = await pool.query(`
      SELECT id, document_type, document_numero, document_numero_devis, is_converted, company_code 
      FROM invoices 
      WHERE document_type = 'devis' 
      ORDER BY id DESC LIMIT 10
    `);
        console.table(sampleDevis.rows);

        if (linkedRes.rows.length > 0) {
            console.log('\n--- CHECKING STATUS OF REFERENCED DEVIS ---');
            for (const doc of linkedRes.rows) {
                const devisNum = doc.document_numero_devis;
                const company = doc.company_code;

                const devisRes = await pool.query(`
                SELECT id, document_numero, document_numero_devis, is_converted, company_code 
                FROM invoices 
                WHERE (document_numero = $1 OR document_numero_devis = $1)
                AND document_type = 'devis' 
                AND company_code = $2
            `, [devisNum, company]);

                if (devisRes.rows.length > 0) {
                    const devis = devisRes.rows[0];
                    const status = devis.is_converted ? '✅ CONVERTED' : '❌ NOT CONVERTED';
                    console.log(`Devis ${devisNum} (${company}): ${status} (ID: ${devis.id})`);
                } else {
                    console.log(`⚠️ Referenced Devis ${devisNum} (${company}) NOT FOUND in DB.`);
                }
            }
        }

    } catch (err) {
        console.error('Error:', err);
    } finally {
        pool.end();
    }
}

checkConversion();
