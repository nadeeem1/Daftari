# 🚀 دليل النشر — GitHub Pages

> حالة وقت كتابة هذا الملف: الشفرة جاهزة 100% للنشر والاختبارات كلها خضراء. **الباقي خطوات يدوية على حساب GitHub** (إنشاء الريبو + مصادقة).

## 0) الحالة الحالية (فحص واقعي بتاريخ 2026-08-27)

| البند | الحالة |
|---|---|
| الـ commit | `db4de5c fix: improve form validation and add comprehensive test report` |
| Working tree | ✅ نظيف |
| البنية `base` | `/daftari-landing/` (متوافق مع GH Pages) |
| مسارات الـ assets في `dist/index.html` | ✅ `../daftari-landing/assets/*` و`favicon` |
| `VITE_DEMO_MODE` | ✅ `true` مفعّل صراحةً في workflow (نموذج صادق بدون كذب على الزائر) |
| الـ remote الحالي | `https://github.com/nadeeem1/daftari-landing.git` |
| **الريبو الفعلي على GitHub** | ❌ **غير موجود** — حساب `nadeeem1` فيه ريبو واحد عام فقط اسمه `GYM` |
| مصادقة git على الجهاز | ❌ لا gh CLI / لا SSH keys / لا credential helper |

## 1) المطلوب منك (مرة واحدة)

1. **أنشئ الريبو** على `https://github.com/new`:
   - اسم الريبو: `daftari-landing` (حرف صغير بالظبط — حساس).
   - `Public` (حتى يشتغل GitHub Pages المجاني).
   - **لا** تخلق README/.gitignore تلقائيًا (عشان ما يحصلش تعارض في الـ push).
2. **صادق git** (أحد الطرق):
   - Option A — GitHub Desktop (الأسهل): افتحه → Add local repository → اختر مجلد المشروع → Publish.
   - Option B — PAT: أنشئ Fine-grained token بصلاحية `Contents: Read and write` من GitHub → Settings → Developer settings → Personal access tokens، ثم:
     ```bash
     git push -u origin main --force-with-lease   # أول مرة فقط؛ في المرة الجاية git push عادي
     ```
     لو طلب username اكتب `nadeeem1`، والكلمة السر = الـ token.
3. **فعّل Pages من Actions**: GitHub → repo → Settings → Pages → Source: **GitHub Actions** (+ حفظ).
   أو اتركه؛ الـ workflow بيشتغل فور الدفع وبيستدعي `deploy-pages@v4` — لكن Pages لازم يكون مصدره **GitHub Actions**.
4. بعد ما الـ الدفع ينجح، Workflow `Deploy to GitHub Pages` هيشتغل تلقائي ويرفع `dist`.

## 2) الرابط المتوقع بعد النشر

```
https://nadeeem1.github.io/daftari-landing/
```

## 3) التحقق بعد النشر (شيك لست)

- [ ] فتح الرابط → عنوان «دفتري — دفتر حسابات رقمي للفريلانسرز».
- [ ] الفافيكون والـ CSS والـ JS يعملون (افحص Console: صفر أخطاء).
- [ ] ختم «مُقفَل» يظهر + العدّادات تتسرّع.
- [ ] التبديل AR/EN يعمل و`dir` ينقلب.
- [ ] نموذج الاشتراك بإيميل صالح → رسالة **Demo** («دي نسخة تجريبية — الإيميل مش هيتسجل») وليست «بعتنالك الرابط». (في `TEST_REPORT.md` سبب ده)
- [ ] Refresh / فتح الرابط مباشرة لا يكسر الصفحة (SPA بدون client routing).
- [ ] فتح `…/daftari-landing/robots.txt` → `Allow: /`.

> من يساعدني في تشغيل الشيك لست دي آليًا، أضيف `Deploy check` في `TEST_REPORT.md`.

## 4) تفعيل الباك إند الحقيقي لاحقًا (اختياري)

- Vercel يحترم `api/subscribe.js` كـ Serverless Function.
- عنده غيّر متغيّر البناء: `VITE_DEMO_MODE=false` → النموذج يرسل فعليًا لـ `/api/subscribe` ويرجع رسالة نجاح/خطأ صادقة.
- لسه محتاج تضيف: قاعدة بيانات أو خدمة إيميل + Rate limiting (الـ TODO نفسه جوه `api/subscribe.js`).

## أمان الـ push

- لا Force Push المطلقة — استخدم `--force-with-lease` فقط عند الحاجة وبتعمد، وإلا `git push` العادي. المطلوب هنا عادي جدًا: أول push على ريبو فاضي.