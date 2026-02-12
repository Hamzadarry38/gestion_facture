const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');

// إعدادات الاتصال بقاعدة البيانات
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'facture_db',
    password: '123456',
    port: 5432,
});

const BACKUP_FILE = path.join(__dirname, 'full_backup.sql');

async function backup() {
    console.log('🚀 بدء عملية النسخ الاحتياطي (Backup)...');
    const client = await pool.connect();

    try {
        const fileStream = fs.createWriteStream(BACKUP_FILE, { flags: 'w' });

        // كتابة الهيدر
        fileStream.write(`-- Backup generated at ${new Date().toISOString()}\n`);
        fileStream.write('BEGIN;\n\n');

        // قائمة الجداول التي نريد نسخ بياناتها (بالترتيب لتجنب مشاكل العلاقات)
        // نبدأ بالجداول التي لا تعتمد على غيرها
        const tables = [
            'users',
            'clients',
            'invoices',
            'invoice_products',
            'invoice_attachments',
            'audit_log',
            'delivery_persons',
            'company_pdf_settings',
            'global_invoices',
            'global_invoice_bons',
            // جداول الشركات الثانوية
            'benali_devis_numbers', 'benali_pdf_paths',
            'smarts_devis_numbers', 'smarts_pdf_paths',
            'msh3_devis_numbers', 'msh3_pdf_paths',
            'saaiss_devis_numbers', 'saaiss_pdf_files', // Legacy tables if exist
            'skm_devis_numbers', 'skm_pdf_files'
        ];

        for (const table of tables) {
            // التحقق من وجود الجدول
            const checkTable = await client.query(`
        SELECT EXISTS (
          SELECT FROM information_schema.tables 
          WHERE table_schema = 'public' 
          AND table_name = $1
        );
      `, [table]);

            if (!checkTable.rows[0].exists) {
                console.log(`⚠️ تخطي الجدول ${table} (غير موجود)`);
                continue;
            }

            console.log(`📦 قراءة بيانات الجدول: ${table}...`);

            const res = await client.query(`SELECT * FROM ${table}`);
            const rows = res.rows;

            if (rows.length > 0) {
                fileStream.write(`-- Data for ${table}\n`);

                for (const row of rows) {
                    const columns = Object.keys(row).join(', ');
                    const values = Object.values(row).map(val => {
                        if (val === null) return 'NULL';
                        if (typeof val === 'number') return val;
                        if (typeof val === 'boolean') return val.toString();
                        if (val instanceof Date) return `'${val.toISOString()}'`;
                        if (typeof val === 'object') return `'${JSON.stringify(val).replace(/'/g, "''")}'`; // JSONB/Arrays
                        // الهروب (Escape) للنصوص التي تحتوي على علامة تنصيص مفردة
                        return `'${val.replace(/'/g, "''")}'`;
                    }).join(', ');

                    fileStream.write(`INSERT INTO ${table} (${columns}) VALUES (${values}) ON CONFLICT DO NOTHING;\n`);
                }
                fileStream.write('\n');
            }
        }

        fileStream.write('COMMIT;\n');
        fileStream.end();

        console.log(`✅✅✅ تم إنشاء النسخة الاحتياطية بنجاح!`);
        console.log(`📂 الملف موجود هنا: ${BACKUP_FILE}`);

    } catch (err) {
        console.error('❌ حدث خطأ:', err.message);
    } finally {
        client.release();
        process.exit(0);
    }
}

backup();
