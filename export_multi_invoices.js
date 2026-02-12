/**
 * استخراج جميع الفواتير من قاعدة بيانات MULTI
 * هذا السكريبت يعرض جميع الفواتير الموجودة في قاعدة البيانات
 */

const initSqlJs = require('sql.js');
const path = require('path');
const fs = require('fs');
const { app } = require('electron');

async function exportMultiInvoices() {
    try {
        // Initialize sql.js
        const SQL = await initSqlJs();
        
        // Get database path
        const dbDir = path.join(process.env.APPDATA || process.env.HOME, 'Gestion des Factures');
        const dbPath = path.join(dbDir, 'multi.db');
        
        console.log('📂 Database path:', dbPath);
        console.log('📂 Database exists:', fs.existsSync(dbPath));
        
        if (!fs.existsSync(dbPath)) {
            console.log('❌ Database file not found!');
            return;
        }
        
        // Load database
        const buffer = fs.readFileSync(dbPath);
        const db = new SQL.Database(buffer);
        
        console.log('\n✅ Database loaded successfully\n');
        
        // Get all invoices
        const invoicesResult = db.exec(`
            SELECT i.*, c.nom as client_nom, c.ice as client_ice
            FROM invoices i
            JOIN clients c ON i.client_id = c.id
            ORDER BY i.year DESC, i.sequential_id DESC
        `);
        
        if (invoicesResult.length === 0) {
            console.log('❌ No invoices found in database');
            return;
        }
        
        const invoices = invoicesResult[0].values;
        console.log(`📋 Found ${invoices.length} invoices:\n`);
        console.log('═'.repeat(150));
        
        invoices.forEach((row, index) => {
            const invoice = {
                id: row[0],
                company_code: row[1],
                client_id: row[2],
                document_type: row[3],
                document_date: row[4],
                document_numero: row[5],
                document_numero_Order: row[6],
                document_numero_bl: row[7],
                document_numero_devis: row[8],
                document_order_devis: row[9],
                document_bon_de_livraison: row[10],
                document_numero_commande: row[11],
                year: row[12],
                sequential_id: row[13],
                total_ht: row[14],
                tva_rate: row[15],
                montant_tva: row[16],
                total_ttc: row[17],
                created_at: row[18],
                updated_at: row[19],
                client_nom: row[20],
                client_ice: row[21]
            };
            
            console.log(`\n📌 Invoice #${index + 1}:`);
            console.log(`   ID: ${invoice.id}`);
            console.log(`   Type: ${invoice.document_type}`);
            console.log(`   Number: ${invoice.document_numero || 'N/A'}`);
            console.log(`   Client: ${invoice.client_nom} (ICE: ${invoice.client_ice})`);
            console.log(`   Date: ${invoice.document_date}`);
            console.log(`   Year: ${invoice.year}, Sequential: ${invoice.sequential_id}`);
            console.log(`   Total HT: ${invoice.total_ht} | TVA: ${invoice.montant_tva} | Total TTC: ${invoice.total_ttc}`);
            console.log(`   Created: ${invoice.created_at}`);
            
            // Get products for this invoice
            const productsResult = db.exec(
                'SELECT * FROM invoice_products WHERE invoice_id = ?',
                [invoice.id]
            );
            
            if (productsResult.length > 0) {
                console.log(`   📦 Products (${productsResult[0].values.length}):`);
                productsResult[0].values.forEach(pRow => {
                    console.log(`      - ${pRow[2]} | Qty: ${pRow[3]} | Price: ${pRow[4]} | Total: ${pRow[5]}`);
                });
            }
        });
        
        console.log('\n' + '═'.repeat(150));
        console.log(`\n✅ Total invoices: ${invoices.length}`);
        
        // Summary by year
        console.log('\n📊 Summary by Year:');
        const byYear = {};
        invoices.forEach(row => {
            const year = row[12];
            if (!byYear[year]) byYear[year] = 0;
            byYear[year]++;
        });
        
        Object.keys(byYear).sort().forEach(year => {
            console.log(`   ${year}: ${byYear[year]} invoices`);
        });
        
        // Summary by type
        console.log('\n📊 Summary by Type:');
        const byType = {};
        invoices.forEach(row => {
            const type = row[3];
            if (!byType[type]) byType[type] = 0;
            byType[type]++;
        });
        
        Object.keys(byType).sort().forEach(type => {
            console.log(`   ${type}: ${byType[type]} invoices`);
        });
        
    } catch (error) {
        console.error('❌ Error:', error);
    }
}

// Run the export
exportMultiInvoices();
