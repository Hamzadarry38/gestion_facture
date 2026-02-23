const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'facture_db',
    password: 'Azer190@',
    port: 5432
});

async function fixProductOrder() {
    try {
        console.log('🔧 ========================================');
        console.log('🔧 Fix Product Order in Invoices');
        console.log('🔧 ========================================\n');

        // Step 1: Check if position column exists
        console.log('📊 Step 1: Check if position column exists');
        console.log('=' .repeat(80));
        
        const columnCheck = await pool.query(`
            SELECT column_name 
            FROM information_schema.columns 
            WHERE table_name = 'invoice_products' 
            AND column_name = 'position'
        `);

        if (columnCheck.rows.length > 0) {
            console.log('✅ Column "position" already exists');
        } else {
            console.log('❌ Column "position" does NOT exist');
            console.log('🔧 Adding "position" column...');
            
            await pool.query(`
                ALTER TABLE invoice_products 
                ADD COLUMN position INTEGER DEFAULT 0
            `);
            
            console.log('✅ Column "position" added successfully!');
        }
        console.log('');

        // Step 2: Update existing products with position based on ID
        console.log('📊 Step 2: Update existing products with position');
        console.log('=' .repeat(80));
        
        const updateResult = await pool.query(`
            WITH ranked_products AS (
                SELECT 
                    id,
                    invoice_id,
                    ROW_NUMBER() OVER (PARTITION BY invoice_id ORDER BY id) - 1 as new_position
                FROM invoice_products
            )
            UPDATE invoice_products ip
            SET position = rp.new_position
            FROM ranked_products rp
            WHERE ip.id = rp.id
            RETURNING ip.id, ip.invoice_id, ip.position
        `);

        console.log(`✅ Updated ${updateResult.rows.length} products with position`);
        console.log('');

        // Step 3: Show sample
        console.log('📊 Step 3: Sample products with position');
        console.log('=' .repeat(80));
        
        const sample = await pool.query(`
            SELECT 
                ip.id,
                ip.invoice_id,
                ip.designation,
                ip.position
            FROM invoice_products ip
            ORDER BY ip.invoice_id, ip.position
            LIMIT 10
        `);

        if (sample.rows.length > 0) {
            console.log('Sample products:');
            sample.rows.forEach(p => {
                console.log(`   Invoice ${p.invoice_id}: Position ${p.position} - ${p.designation}`);
            });
        } else {
            console.log('No products found');
        }

        console.log('\n' + '='.repeat(80));
        console.log('✅ Fix completed!');
        console.log('💡 Now update server.js to:');
        console.log('   1. Save products with position (0, 1, 2, ...)');
        console.log('   2. Load products with ORDER BY position');
        console.log('='.repeat(80));

    } catch (error) {
        console.error('❌ Error:', error.message);
        console.error(error);
    } finally {
        await pool.end();
    }
}

fixProductOrder();
