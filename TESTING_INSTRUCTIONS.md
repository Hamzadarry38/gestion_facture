# تعليمات الاختبار - Testing Instructions

## الخطوة 1: أعد تشغيل التطبيق
```powershell
npm run dev
```

## الخطوة 2: افتح DevTools Console
1. افتح التطبيق
2. اضغط `Ctrl + Shift + I` لفتح DevTools
3. اذهب إلى تبويب **Console**

## الخطوة 3: اذهب إلى شركة ثانوية
1. اختر **BEN ALI** أو **SKM** أو **SAAISS** أو **MSH3**
2. حاول فتح قائمة PDF أو إنشاء Devis جديد

## الخطوة 4: راقب Console
ستجد رسائل مثل:

```
[API Client] Using Base URL: https://redouan.ddns.net/facture
[API Client] 🌐 DDNS URL: https://redouan.ddns.net/facture
[API Client] 🏠 Localhost URL: http://localhost:8001
[API Client] ✅ Active URL: https://redouan.ddns.net/facture

[API Request] 🚀 GET https://redouan.ddns.net/facture/devis/BENALI
[API Response] ✅ GET /devis/BENALI - Status: 200
```

## ما الذي تبحث عنه:

### ✅ إذا رأيت:
```
[API Request] 🚀 GET https://redouan.ddns.net/facture/...
[API Response] ✅ ...
```
**معناها:** التطبيق يتصل بالسيرفر Online بنجاح! 🎉

### ❌ إذا رأيت:
```
[API Request] 🚀 GET https://redouan.ddns.net/facture/...
[API Network Error] ❌ No response received
[API Network Error] ❌ This means the server is not reachable at: https://redouan.ddns.net/facture
```
**معناها:** التطبيق يحاول الاتصال بـ DDNS لكن السيرفر غير متاح!

### 🔍 إذا رأيت:
```
[API Request] 🚀 GET http://localhost:8001/...
```
**معناها:** التطبيق ما زال يستخدم localhost (ليس DDNS)!

## الخطوة 5: أرسل لي النتائج
انسخ كل الرسائل من Console وأرسلها لي!
