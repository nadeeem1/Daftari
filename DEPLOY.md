# 🚀 دليل النشر — GitHub Pages

> الحالة: **تم النشر** — الريبو `nadeeem1/Daftari` يعمل و GitHub Actions يُنشر `dist` automatically. (تاريخ 2026-08-27)

## 0) الحالة الحالية

| البند | الحالة |
|---|---|
| الريبو الفعلي | ✅ `github.com/nadeeem1/Daftari` (Public) |
| البنية `base` | `/Daftari/` (مطابق لمسار GitHub Pages) |
| مسارات الـ assets في `dist/index.html` | ✅ `/Daftari/assets/*` + `/Daftari/favicon.svg` + `/Daftari/robots.txt` |
| `VITE_DEMO_MODE` | ✅ `true` مفعّل صراحةً في workflow (نموذج صادق بدون كذب على الزائر) |
| الـ remote | ✅ `git@github.com:nadeeem1/Daftari.git` (SSH) |
| مصادقة git على الجهاز | ✅ SSH key يعمل مع `nadeeem1` |

## 1) النشر

```bash
git push -u origin main
```

ضبط الـ remote لو لزم:

```bash
git remote set-url origin git@github.com:nadeeem1/Daftari.git
```

## 2) الرابط المنشور

```
https://nadeeem1.github.io/Daftari/
```

## 3) التحقق بعد النشر (شيك لست)

- [x] فتح الرابط → عنوان «Daftari — A digital ledger for freelancers».
- [x] الفافيكون والـ CSS والـ JS يعملون (افحص Console: صفر أخطاء).
- [x] ختم «BALANCED» يظهر + العدّادات تتسرّع.
- [x] الموقع إنجليزي خالص: `lang="en" dir="ltr"` بلا زر تبديل.
- [x] نموذج الاشتراك بإيميل صالح → رسالة **Demo** («your email won’t be stored…») وليست «check your inbox».
- [x] Refresh / فتح الرابط مباشرة لا يكسر الصفحة (SPA بدون client routing).
- [x] فتح `…/Daftari/robots.txt` → `Allow: /`.

## 4) تفعيل الباك إند الحقيقي لاحقًا (اختياري)

- Vercel يحترم `api/subscribe.js` كـ Serverless Function.
- عنده غيّر متغيّر البناء: `VITE_DEMO_MODE=false` → النموذج يرسل فعليًا لـ `/api/subscribe` ويرجع رسالة نجاح/خطأ صادقة.
- لسه محتاج تضيف: قاعدة بيانات أو خدمة إيميل + Rate limiting (الـ TODO نفسه جوه `api/subscribe.js`).

## أمان الـ push

- لا Force Push المطلقة — استخدم `--force-with-lease` فقط عند الحاجة وبتعمد، وإلا `git push` العادي.