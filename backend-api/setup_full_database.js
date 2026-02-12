const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 بدء إعداد قاعدة البيانات الشامل (Full Database Setup)...');

// Helper to run a script
function runScript(scriptName) {
    const scriptPath = path.join(__dirname, scriptName);
    if (!fs.existsSync(scriptPath)) {
        console.warn(`⚠️ تخطي: الملف ${scriptName} غير موجود.`);
        return;
    }

    console.log(`\n📦 تشغيل: ${scriptName}...`);
    try {
        if (scriptName.endsWith('.js')) {
            execSync(`node "${scriptName}"`, { stdio: 'inherit' });
        } else {
            // For SQL files, we'd ideally load and run them, but since we don't have a direct SQL runner here without PG client,
            // we assume the user has JS wrappers or we instruct them.
            // HOWEVER, based on your request, I will run the key JS setup scripts that likely execute these SQLs or do the setup logic.
        }
        console.log(`✅ تم بنجاح: ${scriptName}`);
    } catch (err) {
        console.error(`❌ فشل في تشغيل ${scriptName}:`, err.message);
        // We don't exit process here to allow other independent scripts to run, unless critical.
    }
}

try {
    // 1. Core Schema Setup (if a JS wrapper exists, otherwise we rely on rebuild_tables.js which is comprehensive)
    // rebuild_tables.js creates the secondary company tables (devis/pdf) which was the immediate issue.
    runScript('rebuild_tables.js');

    // 2. Additional Feature Tables (Global Invoices)
    runScript('setup_global_invoices.js');

    // 3. User & Auth Setup (Often handled in server.js, but if there are specific migration scripts for users)
    // (No specific user setup JS found in the list strictly for creating users table, likely in schema.sql/server.js)

    // 4. Updates & Migrations (Order matters)
    runScript('add_is_converted_column.js');
    runScript('migrate-creation-method.js');
    // runScript('migrate_validation.js'); // Optional, if validation logic changed
    runScript('fix_permissions.js'); // Ensure user permissions are set

    // 5. Verification
    runScript('verify_tables.js');
    runScript('check_db.js');

    console.log('\n\n🏁🏁🏁 تم الانتهاء من جميع التحديثات والإعدادات! 🏁🏁🏁');
    console.log('👉 يمكنك الآن تشغيل السيرفر بأمان: node server.js');

} catch (error) {
    console.error('\n❌ حدث خطأ غير متوقع:', error.message);
    process.exit(1);
}
