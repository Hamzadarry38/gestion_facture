/**
 * التحقق من جداول قاعدة البيانات
 */

const initSqlJs = require('sql.js');
const path = require('path');
const fs = require('fs');

async function checkDbTables() {
    try {
        const SQL = await initSqlJs();
        
        const dbPath = path.join(__dirname, 'database', 'invoices_multi.db');
        
        if (!fs.existsSync(dbPath)) {
            console.log('❌ لم يتم العثور على قاعدة البيانات');
            return;
        }
        
        console.log('✅ تم العثور على قاعدة البيانات:', dbPath);
        
        const buffer = fs.readFileSync(dbPath);
        const db = new SQL.Database(buffer);
        
        // Get all tables
        const result = db.exec(`
            SELECT name FROM sqlite_master 
            WHERE type='table'
            ORDER BY name
        `);
        
        if (result.length === 0) {
            console.log('❌ لا توجد جداول');
            return;
        }
        
        console.log('\n📋 الجداول الموجودة:');
        result[0].values.forEach(row => {
            console.log(`   - ${row[0]}`);
        });
        
        // Check each table
        console.log('\n📊 تفاصيل الجداول:\n');
        
        result[0].values.forEach(row => {
            const tableName = row[0];
            const countResult = db.exec(`SELECT COUNT(*) as count FROM ${tableName}`);
            const count = countResult[0].values[0][0];
            console.log(`${tableName}: ${count} صفوف`);
        });
        
    } catch (error) {
        console.error('❌ خطأ:', error.message);
    }
}

checkDbTables();
