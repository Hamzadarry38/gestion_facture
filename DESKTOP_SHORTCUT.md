# 🎯 ميزة اختصار سطح المكتب

## الوصف
تم إضافة ميزة جديدة تقوم بإنشاء اختصار (Shortcut) على سطح المكتب تلقائياً عند تثبيت التطبيق أو عند أول تشغيل.

## المميزات

### 1. **إنشاء اختصار تلقائي**
- ✅ يتم إنشاء اختصار على سطح المكتب عند أول تشغيل
- ✅ يتم التحقق من وجود الاختصار تجنباً لإنشاء نسخ متعددة
- ✅ الاختصار يحتوي على وصف التطبيق

### 2. **إعدادات NSIS**
تم إضافة إعدادات في `package.json` لـ NSIS installer:
```json
"nsis": {
  "oneClick": false,
  "allowToChangeInstallationDirectory": true,
  "createDesktopShortcut": true,
  "createStartMenuShortcut": true,
  "shortcutName": "Gestion des Factures"
}
```

**معنى الإعدادات:**
- `oneClick: false` - السماح للمستخدم بتخصيص التثبيت
- `allowToChangeInstallationDirectory: true` - السماح بتغيير مجلد التثبيت
- `createDesktopShortcut: true` - إنشاء اختصار على سطح المكتب
- `createStartMenuShortcut: true` - إنشاء اختصار في قائمة ابدأ
- `shortcutName` - اسم الاختصار

### 3. **الكود المضاف في main.js**

```javascript
// Create desktop shortcut on first run
function createDesktopShortcut() {
  try {
    const desktopPath = path.join(app.getPath('home'), 'Desktop');
    const shortcutPath = path.join(desktopPath, 'Gestion des Factures.lnk');
    
    // Check if shortcut already exists
    if (fs.existsSync(shortcutPath)) {
      console.log('✅ Desktop shortcut already exists');
      return;
    }
    
    // Get the executable path
    const exePath = process.execPath;
    
    // Create shortcut using Windows API
    const { execSync } = require('child_process');
    
    // PowerShell script to create shortcut
    const psScript = `
      $WshShell = New-Object -ComObject WScript.Shell
      $Shortcut = $WshShell.CreateShortcut("${shortcutPath}")
      $Shortcut.TargetPath = "${exePath}"
      $Shortcut.WorkingDirectory = "${path.dirname(exePath)}"
      $Shortcut.Description = "Gestion des Factures - Application de gestion des factures"
      $Shortcut.Save()
    `;
    
    // Execute PowerShell script
    execSync(`powershell -Command "${psScript.replace(/"/g, '\\"')}"`, { 
      stdio: 'pipe',
      shell: true 
    });
    
    console.log('✅ Desktop shortcut created successfully');
  } catch (error) {
    console.error('⚠️ Error creating desktop shortcut:', error.message);
  }
}
```

## كيفية العمل

1. **عند التثبيت:**
   - NSIS installer سيقوم بإنشاء اختصار على سطح المكتب تلقائياً
   - سيقوم أيضاً بإنشاء اختصار في قائمة ابدأ (Start Menu)

2. **عند أول تشغيل:**
   - التطبيق سيتحقق من وجود الاختصار على سطح المكتب
   - إذا لم يكن موجوداً، سيقوم بإنشاؤه تلقائياً

3. **عند التشغيلات اللاحقة:**
   - التطبيق سيتحقق من وجود الاختصار
   - إذا كان موجوداً، لن يقوم بأي شيء

## الفوائد

✅ **سهولة الوصول:** المستخدم يمكنه الوصول للتطبيق بسرعة من سطح المكتب
✅ **تجربة مستخدم أفضل:** لا حاجة لفتح المجلدات أو البحث عن التطبيق
✅ **احترافية:** يعطي انطباع احترافي للتطبيق
✅ **توافق:** يعمل على جميع إصدارات Windows

## الملفات المعدلة

1. **package.json** - إضافة إعدادات NSIS
2. **main.js** - إضافة دالة `createDesktopShortcut()` واستدعاؤها عند البدء

## الاختبار

لاختبار الميزة:

```bash
# بناء التطبيق
npm run build:win

# أو للتطوير
npm run dev
```

بعد التشغيل، تحقق من وجود اختصار على سطح المكتب باسم "Gestion des Factures"

## ملاحظات

- الاختصار يتم إنشاؤه فقط على Windows
- إذا كان لدى المستخدم صلاحيات محدودة، قد لا يتم إنشاء الاختصار
- الخطأ في إنشاء الاختصار لن يؤثر على تشغيل التطبيق
