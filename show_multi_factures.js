/**
 * عرض جميع الفواتير من نوع "facture" في قاعدة بيانات MULTI
 * يستخدم نفس البنية من db_multi.js
 */

const initSqlJs = require('sql.js');
const path = require('path');
const fs = require('fs');

async function showMultiFactures() {
    try {
        // Initialize sql.js
        const SQL = await initSqlJs();
        
        // Try to find the database file
        const appDataPath = process.env.APPDATA || path.join(process.env.HOME || '', 'AppData', 'Roaming');
        const possiblePaths = [
            path.join(appDataPath, 'gestion-factures', 'multi.db'),
            path.join(appDataPath, 'Gestion des Factures', 'multi.db'),
            path.join(__dirname, 'database', 'invoices_multi.db'),
            path.join(__dirname, 'multi.db'),
        ];
        
        let dbPath = null;
        for (const p of possiblePaths) {
            if (fs.existsSync(p)) {
                dbPath = p;
                break;
            }
        }
        
        if (!dbPath) {
            console.log('\n❌ لم يتم العثور على قاعدة البيانات\n');
            return;
        }
        
        console.log('\n✅ تم العثور على قاعدة البيانات:', dbPath, '\n');
        
        // Load database
        const buffer = fs.readFileSync(dbPath);
        const db = new SQL.Database(buffer);
        
        // First, check what tables exist
        const tablesResult = db.exec(`
            SELECT name FROM sqlite_master 
            WHERE type='table'
            ORDER BY name
        `);
        
        console.log('📋 الجداول الموجودة في قاعدة البيانات:');
        if (tablesResult.length > 0) {
            tablesResult[0].values.forEach(row => {
                console.log(`   - ${row[0]}`);
            });
        }
        console.log();
        
        // Try to get all factures
        try {
            const result = db.exec(`
                SELECT 
                    i.id,
                    i.document_numero,
                    i.document_date,
                    i.year,
                    i.sequential_id,
                    i.total_ht,
                    i.montant_tva,
                    i.total_ttc,
                    c.nom as client_nom,
                    c.ice as client_ice,
                    i.document_type
                FROM invoices i
                JOIN clients c ON i.client_id = c.id
                WHERE i.document_type = 'facture'
                ORDER BY i.year DESC, i.sequential_id DESC
            `);
            
            if (result.length === 0 || result[0].values.length === 0) {
                console.log('❌ لا توجد فواتير من نوع "facture"\n');
                
                // Show all invoices regardless of type
                const allResult = db.exec(`
                    SELECT 
                        i.id,
                        i.document_numero,
                        i.document_date,
                        i.year,
                        i.sequential_id,
                        i.total_ht,
                        i.montant_tva,
                        i.total_ttc,
                        c.nom as client_nom,
                        c.ice as client_ice,
                        i.document_type
                    FROM invoices i
                    JOIN clients c ON i.client_id = c.id
                    ORDER BY i.year DESC, i.sequential_id DESC
                `);
                
                if (allResult.length > 0 && allResult[0].values.length > 0) {
                    console.log('📋 جميع الفواتير الموجودة:\n');
                    allResult[0].values.forEach((row, index) => {
                        console.log(`${index + 1}. الفاتورة #${row[1] || 'N/A'} (النوع: ${row[10]})`);
                        console.log(`   المعرّف: ${row[0]}`);
                        console.log(`   التاريخ: ${row[2]}`);
                        console.log(`   السنة: ${row[3]}, الرقم المتسلسل: ${row[4]}`);
                        console.log(`   العميل: ${row[8]} (ICE: ${row[9]})`);
                        console.log(`   الإجمالي بدون ضريبة: ${row[5]}`);
                        console.log(`   الضريبة: ${row[6]}`);
                        console.log(`   الإجمالي مع الضريبة: ${row[7]}\n`);
                    });
                } else {
                    console.log('❌ لا توجد أي فواتير في قاعدة البيانات\n');
                }
                return;
            }
            
            const factures = result[0].values;
            console.log(`📋 عدد الفواتير من نوع "facture": ${factures.length}\n`);
            console.log('═'.repeat(100));
            
            factures.forEach((row, index) => {
                console.log(`\n${index + 1}. الفاتورة #${row[1] || 'N/A'}`);
                console.log(`   المعرّف: ${row[0]}`);
                console.log(`   التاريخ: ${row[2]}`);
                console.log(`   السنة: ${row[3]}, الرقم المتسلسل: ${row[4]}`);
                console.log(`   العميل: ${row[8]} (ICE: ${row[9]})`);
                console.log(`   الإجمالي بدون ضريبة: ${row[5]}`);
                console.log(`   الضريبة: ${row[6]}`);
                console.log(`   الإجمالي مع الضريبة: ${row[7]}`);
            });
            
            console.log('\n' + '═'.repeat(100));
            console.log(`\n✅ المجموع: ${factures.length} فاتورة\n`);
            
        } catch (error) {
            console.error('❌ خطأ في الاستعلام:', error.message);
            console.log('\nحاول الاستعلام عن جميع الفواتير...\n');
            
            const allResult = db.exec(`SELECT * FROM invoices LIMIT 5`);
            if (allResult.length > 0) {
                console.log('عينة من الفواتير:');
                console.log(allResult[0].values);
            }
        }
        
    } catch (error) {
        console.error('❌ خطأ:', error.message);
    }
}

showMultiFactures();
