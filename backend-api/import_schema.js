const { Client } = require('pg');
const fs = require('fs');
const path = require('path');

const SCHEMA_FILE = path.join(__dirname, 'exported_schema.sql');
const dbPassword = process.argv[2] || 'Azer190@';

const dbConfig = {
    user: 'postgres',
    host: 'localhost',
    password: dbPassword,
    port: 5432,
};

async function importSchema() {
    console.log('🚀 بدء استيراد هيكل قاعدة البيانات (Schema Import)...');

    // 1. Check file exists
    if (!fs.existsSync(SCHEMA_FILE)) {
        console.error(`❌ خطأ: ملف exported_schema.sql غير موجود!`);
        console.error(`👉 تأكد من نسخ الملف من الحاسوب الأصلي إلى مجلد backend-api`);
        process.exit(1);
    }

    // 2. Connect to local 'postgres' database to check/create 'facture_db'
    const pgClient = new Client({ ...dbConfig, database: 'postgres' });

    try {
        await pgClient.connect();

        const dbName = 'facture_db';
        const res = await pgClient.query(`SELECT 1 FROM pg_database WHERE datname = $1`, [dbName]);

        if (res.rowCount === 0) {
            console.log(`⏳ قاعدة البيانات '${dbName}' غير موجودة... جاري إنشاؤها...`);
            await pgClient.query(`CREATE DATABASE ${dbName}`);
            console.log(`✅ تم إنشاء قاعدة البيانات '${dbName}' بنجاح.`);
        } else {
            console.log(`✅ قاعدة البيانات '${dbName}' موجودة مسبقاً.`);
        }
    } catch (err) {
        console.error('❌ خطأ أثناء الاتصال بـ PostgreSQL / إنشاء القاعدة:', err.message);
        console.error('💡 تأكد من صحة كلمة المرور وأن خادم PostgreSQL يعمل.');
        process.exit(1);
    } finally {
        await pgClient.end();
    }

    // 3. Connect to the actual database 'facture_db' to import the schema
    const targetClient = new Client({ ...dbConfig, database: 'facture_db' });

    try {
        await targetClient.connect();

        console.log('📖 قراءة ملف السكيما...');
        const sql = fs.readFileSync(SCHEMA_FILE, 'utf8');

        console.log('⏳ جاري إنشاء الجداول (قد يستغرق لحظات)...');
        await targetClient.query(sql);

        // Verify tables
        const tablesRes = await targetClient.query(`
            SELECT table_name FROM information_schema.tables 
            WHERE table_schema = 'public' AND table_type = 'BASE TABLE'
            ORDER BY table_name
        `);

        console.log(`\n✅✅✅ تم استيراد السكيما بنجاح!`);
        console.log(`📋 الجداول الموجودة الآن (${tablesRes.rows.length}):`);
        tablesRes.rows.forEach(r => console.log(`   ✅ ${r.table_name}`));
        console.log(`\n👉 يمكنك الآن تشغيل السيرفر: node server.js`);

    } catch (err) {
        console.error('❌ خطأ أثناء استيراد الجداول:', err.message);
    } finally {
        await targetClient.end();
        process.exit(0);
    }
}

importSchema();
