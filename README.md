# دفتري — Landing Page (Vite + SolidJS)

لاندنج بيدج لمنتج SaaS خيالي اسمه **دفتري**: أداة فوترة وتتبّع وقت للفريلانسرز العرب.
النسخة دي مبنية بـ Stack حديث بدل النسخة الأولى (HTML/CSS/JS خام)، عشان تعكس أحدث اتجاهات الواجهة الأمامية في 2026.

## الـ Stack

| الطبقة | التقنية | ليه |
|---|---|---|
| Build tool | **Vite 8** | dev server وHMR فوريين، بيستخدم esbuild (Go) للتطوير وRollup للبناء النهائي |
| Framework | **SolidJS** (Signal-based) | تحديث دقيق للـ DOM من غير Virtual DOM ومن غير إعادة تصيير المكوّن كله |
| Backend خفيف | **Vercel Serverless Function** (`api/subscribe.js`) | مثال Full-stack بسيط لفورم الاشتراك من غير الحاجة لمشروع Next.js كامل |
| CSS | **Container Queries + `:has()` + View Transitions API** | تفاعلات وتخطيطات حديثة بدون أي مكتبة CSS خارجية |

## تشغيل المشروع محليًا

```bash
npm install
npm run dev       # يفتح على http://localhost:5173 مع HMR فوري
```

## البناء للإنتاج

```bash
npm run build      # بيطلع الملفات النهائية في dist/
npm run preview    # معاينة نسخة الإنتاج محليًا
```

## النشر على Vercel

1. ادفع المشروع على GitHub.
2. اربطه بـ Vercel — هيكتشف Vite تلقائيًا (Build command: `vite build`, Output: `dist`).
3. دالة `api/subscribe.js` هتشتغل تلقائيًا كـ Serverless Function من غير أي إعداد إضافي.

## بنية الملفات

```
├── index.html          # نقطة الدخول، بتحمّل src/main.jsx
├── src/
│   ├── main.jsx         # تركيب التطبيق (render)
│   ├── App.jsx           # المكوّن الرئيسي — كل الصفحة مبنية بـ Signals
│   ├── translations.js   # قاموس AR/EN
│   └── index.css         # التنسيقات + Container Queries + :has()
├── api/
│   └── subscribe.js      # Serverless Function لفورم الاشتراك
└── vite.config.js
```

## ملاحظة عن التقنيات المتقدمة اللي اتضافت

راجع **REPORT.md** لشرح مفصّل عن كل تقنية اتضافت (Vite، Signals، الـ Serverless function، الـ CSS الحديث)، وليه اخترناها بالتحديد بدل بدائلها (زي Next.js أو React).
