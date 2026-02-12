const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'facture_db',
    password: 'Azer190@',
    port: 5432,
});

const BACKUP_FILE = path.join(__dirname, 'full_backup.sql');

async function restore() {
    console.log('🚀 بدء عملية استرجاع البيانات (Restore)...');

    if (!fs.existsSync(BACKUP_FILE)) {
        console.error(`❌ خطأ: ملف النسخة الاحتياطية غير موجود: ${BACKUP_FILE}`);
        process.exit(1);
    }

    const client = await pool.connect();

    try {
        console.log('📖 قراءة ملف النسخة الاحتياطية...');
        const sql = fs.readFileSync(BACKUP_FILE, 'utf8');

        console.log('⏳ جاري تنفيذ الأوامر (قد يستغرق بعض الوقت)...');

        // تقسيم الملف إلى أوامر منفصلة (اختياري، أو تنفيذه دفعة واحدة)
        // لتجنب مشاكل الذاكرة مع الملفات الكبيرة، يمكننا قراءته سطر بسطر، لكن للسهولة سنرسله كاملاً
        // PostgreSQL يستطيع التعامل مع سكريبت كبير في query واحدة عادة.

        await client.query(sql);

        console.log('✅✅✅ تم استرجاع البيانات بنجاح!');

    } catch (err) {
        console.error('❌ حدث خطأ أثناء الاسترجاع:', err.message);
    } finally {
        client.release();
        process.exit(0);
    }
}

restore();
