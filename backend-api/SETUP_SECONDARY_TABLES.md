# تعليمات إنشاء جداول الشركات الثانوية

## على الجهاز الذي يحتوي على PostgreSQL (الجهاز الرئيسي):

### الخطوة 1: انسخ الملف
انسخ ملف `create_secondary_tables.js` إلى الجهاز الرئيسي في مجلد `backend-api`

### الخطوة 2: عدّل معلومات الاتصال بقاعدة البيانات
افتح `create_secondary_tables.js` وتأكد من:
```javascript
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'facture_db',
  password: '123456',  // غيّر هذا إذا كانت كلمة المرور مختلفة!
  port: 5432,
});
```

### الخطوة 3: شغّل السكريبت
```powershell
cd backend-api
node create_secondary_tables.js
```

### النتيجة المتوقعة:
```
🔧 Creating tables for secondary companies...

📊 Creating tables for BENALI...
  ✅ Created benali_devis_numbers table
  ✅ Created benali_pdf_paths table
  ✅ Created indexes for benali

📊 Creating tables for SKM...
  ✅ Created skm_devis_numbers table
  ✅ Created skm_pdf_paths table
  ✅ Created indexes for skm

📊 Creating tables for SAAISS...
  ✅ Created saaiss_devis_numbers table
  ✅ Created saaiss_pdf_paths table
  ✅ Created indexes for saaiss

📊 Creating tables for MSH3...
  ✅ Created msh3_devis_numbers table
  ✅ Created msh3_pdf_paths table
  ✅ Created indexes for msh3

🎉 All tables created successfully!
```

### الخطوة 4: اختبر التطبيق
بعد إنشاء الجداول، جرّب التطبيق مرة أخرى:
1. افتح التطبيق
2. اذهب إلى BEN ALI أو SKM
3. حاول إنشاء Devis جديد
4. يجب أن يعمل بدون أخطاء! ✅

## ملاحظة:
إذا ظهر خطأ في الاتصال، تأكد من:
- PostgreSQL يعمل على الجهاز الرئيسي
- كلمة المرور صحيحة
- قاعدة البيانات `facture_db` موجودة
