/**
 * عرض جميع الفواتير من نوع "facture" في قاعدة بيانات MULTI
 */

const initSqlJs = require('sql.js');
const path = require('path');
const fs = require('fs');

async function listMultiFactures() {
    try {
        // Initialize sql.js
        const SQL = await initSqlJs();
        
        // Try different possible database paths
        const possiblePaths = [
            path.join(__dirname, 'database', 'invoices_multi.db'),
            path.join(process.env.APPDATA || '', 'Gestion des Factures', 'multi.db'),
            path.join(process.env.HOME || '', 'AppData', 'Roaming', 'Gestion des Factures', 'multi.db'),
            path.join(__dirname, 'multi.db'),
            path.join(__dirname, 'database', 'multi.db')
        ];
        
        let dbPath = null;
        for (const p of possiblePaths) {
            if (fs.existsSync(p)) {
                dbPath = p;
                break;
            }
        }
        
        if (!dbPath) {
            console.log('❌ لم يتم العثور على قاعدة البيانات');
            console.log('المسارات المحاولة:');
            possiblePaths.forEach(p => console.log(`   - ${p}`));
            return;
        }
        
        console.log('✅ تم العثور على قاعدة البيانات:', dbPath);
        
        // Load database
        const buffer = fs.readFileSync(dbPath);
        const db = new SQL.Database(buffer);
        
        // Get all factures (document_type = 'facture')
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
                c.ice as client_ice
            FROM invoices i
            JOIN clients c ON i.client_id = c.id
            WHERE i.document_type = 'facture'
            ORDER BY i.year DESC, i.sequential_id DESC
        `);
        
        if (result.length === 0 || result[0].values.length === 0) {
            console.log('❌ لا توجد فواتير من نوع "facture"');
            return;
        }
        
        const factures = result[0].values;
        console.log(`\n📋 عدد الفواتير: ${factures.length}\n`);
        console.log('═'.repeat(120));
        
        factures.forEach((row, index) => {
            console.log(`\n${index + 1}. الفاتورة #${row[1]}`);
            console.log(`   معرّف: ${row[0]}`);
            console.log(`   التاريخ: ${row[2]}`);
            console.log(`   السنة: ${row[3]}, الرقم المتسلسل: ${row[4]}`);
            console.log(`   العميل: ${row[8]} (ICE: ${row[9]})`);
            console.log(`   الإجمالي بدون ضريبة: ${row[5]}`);
            console.log(`   الضريبة: ${row[6]}`);
            console.log(`   الإجمالي مع الضريبة: ${row[7]}`);
        });
        
        console.log('\n' + '═'.repeat(120));
        console.log(`\n✅ المجموع: ${factures.length} فاتورة\n`);
        
    } catch (error) {
        console.error('❌ خطأ:', error.message);
    }
}

// Run
listMultiFactures();
