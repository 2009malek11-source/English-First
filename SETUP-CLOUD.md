# تفعيل الحساب السحابي لـ English First

تم إنشاء مشروع Supabase باسم `english-first` وكُتب عنوانه ومفتاحه العام في `supabase-config.js`.
بقيت الخطوات التي تحتاج حسابك أنت (لا أستطيع تنفيذها من عندي):

## 1) إنشاء جدول التقدّم (دقيقتان)
1. افتح https://supabase.com/dashboard ثم مشروع **english-first**.
2. من القائمة اليسرى: **SQL Editor** ثم **New query**.
3. الصق كامل محتوى الملف `SUPABASE_SETUP.sql` واضغط **Run**.
   بدون هذه الخطوة يعمل الموقع لكن لا يُحفظ التقدّم في السحابة، وتظهر رسالة: "The cloud database is not set up yet".

## 2) بعد نشر الموقع على Netlify
انسخ رابط موقعك (مثل `https://اسمك.netlify.app`) ثم في Supabase:
**Authentication ← URL Configuration**
- **Site URL**: رابط موقعك.
- **Redirect URLs**: أضف رابط موقعك نفسه.
هذا يجعل روابط تأكيد البريد وإعادة كلمة المرور تعمل.

## 3) (اختياري) الدخول بحساب Google
1. Google Cloud Console ← APIs & Services ← Credentials ← Create OAuth client ID (Web application).
2. في Authorized redirect URIs ضع الرابط الظاهر في Supabase: Authentication ← Providers ← Google.
3. انسخ Client ID و Client Secret إلى Supabase وفعّل Google.
4. افتح `supabase-config.js` وغيّر `google:false` إلى `google:true` ثم أعد النشر.

## 4) Apple / iCloud
يحتاج حساب Apple Developer المدفوع، لذلك لم يُفعَّل. الدخول بالبريد وبـ Google مجاني.

## تأكيد البريد
إن أردت أن يدخل المستخدم مباشرة بعد التسجيل: Authentication ← Providers ← Email ← أوقف **Confirm email**.

## النشر على Netlify (مجاني)
- الأسهل: افتح https://app.netlify.com/drop واسحب **مجلد** الموقع (بعد فك الضغط) إلى الصفحة.
- الملف `netlify.toml` يضبط الكاش والأمان تلقائيًا.

## التحديثات
عند نشر نسخة جديدة: غيّر رقم `CACHE` في `service-worker.js` (مثلًا v7). سيرى المستخدم رسالة "نسخة جديدة جاهزة" ولا يتم التحديث إلا بموافقته، وتقدّمه محفوظ.
