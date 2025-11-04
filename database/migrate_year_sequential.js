// Migration script to add year and sequential_id to existing invoices

// Migration script to add year and sequential_id to existing invoices
async function migrateInvoices() {
    console.log('🔄 Starting migration for existing invoices...\n');
    
    try {
        // Migrate CHAIMAE database
        console.log('📊 Migrating CHAIMAE database...');
        await migrateCHAIMAE();
        
        // Migrate MRY database
        console.log('\n📊 Migrating MRY database...');
        await migrateMRY();
        
        console.log('\n✅ Migration completed successfully!');
    } catch (error) {
        console.error('❌ Migration failed:', error);
        process.exit(1);
    }
}

async function migrateCHAIMAE() {
    const dbModule = require('./db_chaimae');
    await dbModule.initDatabase();
    
    // Access db through the module's getter
    const db = dbModule.getDatabase();
    
    if (!db) {
        console.log('   ⚠️  Database not initialized for CHAIMAE');
        return;
    }
    
    // Get all invoices without year/sequential_id
    const result = db.exec(`
        SELECT id, document_date 
        FROM invoices 
        WHERE year IS NULL OR sequential_id IS NULL
        ORDER BY document_date ASC, id ASC
    `);
    
    if (result.length === 0 || result[0].values.length === 0) {
        console.log('   ℹ️  No invoices to migrate in CHAIMAE database');
        return;
    }
    
    const invoices = result[0].values;
    console.log(`   Found ${invoices.length} invoices to migrate`);
    
    // Group by year
    const yearGroups = {};
    for (const [id, date] of invoices) {
        const year = new Date(date).getFullYear();
        if (!yearGroups[year]) {
            yearGroups[year] = [];
        }
        yearGroups[year].push(id);
    }
    
    // Update each year group
    let totalUpdated = 0;
    for (const [year, ids] of Object.entries(yearGroups)) {
        console.log(`   📅 Processing year ${year}: ${ids.length} invoices`);
        
        ids.forEach((id, index) => {
            const sequentialId = index + 1;
            db.run(`
                UPDATE invoices 
                SET year = ?, sequential_id = ? 
                WHERE id = ?
            `, [parseInt(year), sequentialId, id]);
            totalUpdated++;
        });
    }
    
    // Save database
    dbModule.saveDatabase();
    console.log(`   ✅ Updated ${totalUpdated} invoices in CHAIMAE database`);
}

async function migrateMRY() {
    const dbModule = require('./db');
    await dbModule.initDatabase();
    
    // Access db through the module's getter
    const db = dbModule.getDatabase();
    
    if (!db) {
        console.log('   ⚠️  Database not initialized for MRY');
        return;
    }
    
    // Get all invoices without year/sequential_id
    const result = db.exec(`
        SELECT id, document_date, company_code 
        FROM invoices 
        WHERE year IS NULL OR sequential_id IS NULL
        ORDER BY company_code, document_date ASC, id ASC
    `);
    
    if (result.length === 0 || result[0].values.length === 0) {
        console.log('   ℹ️  No invoices to migrate in MRY database');
        return;
    }
    
    const invoices = result[0].values;
    console.log(`   Found ${invoices.length} invoices to migrate`);
    
    // Group by company and year
    const companyYearGroups = {};
    for (const [id, date, companyCode] of invoices) {
        const year = new Date(date).getFullYear();
        const key = `${companyCode}_${year}`;
        if (!companyYearGroups[key]) {
            companyYearGroups[key] = {
                company: companyCode,
                year: year,
                ids: []
            };
        }
        companyYearGroups[key].ids.push(id);
    }
    
    // Update each company-year group
    let totalUpdated = 0;
    for (const [key, group] of Object.entries(companyYearGroups)) {
        console.log(`   📅 Processing ${group.company} - ${group.year}: ${group.ids.length} invoices`);
        
        group.ids.forEach((id, index) => {
            const sequentialId = index + 1;
            db.run(`
                UPDATE invoices 
                SET year = ?, sequential_id = ? 
                WHERE id = ?
            `, [group.year, sequentialId, id]);
            totalUpdated++;
        });
    }
    
    // Save database
    dbModule.saveDatabase();
    console.log(`   ✅ Updated ${totalUpdated} invoices in MRY database`);
}

// Run migration
migrateInvoices().then(() => {
    console.log('\n🎉 All done! You can now use the year-based sequential ID system.');
    process.exit(0);
}).catch(error => {
    console.error('\n❌ Migration failed:', error);
    process.exit(1);
});
