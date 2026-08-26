// api/subscribe.js
// Vercel Serverless Function — بتشتغل تلقائي لو اترفع المشروع على Vercel
// (مسار /api/subscribe بيتنفّذ على السيرفر، مش في المتصفح).
//
// ده مثال مبسّط لفكرة "الاندماج بين الواجهة الأمامية والخلفية" في
// الأطر الحديثة (زي Next.js API routes / SvelteKit actions) لكن
// من غير الحاجة لمشروع Next.js كامل — Vite + دالة Serverless واحدة
// كفاية لصفحة هبوط بسيطة زي دي.
//
// ملاحظات أمان مهمة قبل الاستخدام في بيئة إنتاج حقيقية:
// 1. أضف rate limiting (مثلاً عبر Vercel Edge Config أو Upstash)
//    عشان تمنع حد يبعت آلاف الطلبات بالثانية (abuse / spam).
// 2. تحقق تاني من الإيميل هنا في السيرفر — التحقق في المتصفح
//    ممكن أي حد يتخطاه بسهولة عن طريق curl مباشرة للـ endpoint.
// 3. لا تعيد أي تفاصيل تقنية للعميل في رسالة الخطأ (زي نوع الخطأ
//    من قاعدة البيانات) — رد عام بس.
// 4. خزّن أي مفتاح API (خدمة إيميل، قاعدة بيانات) في Environment
//    Variables على Vercel، وابدًا متحطش مفتاح في الكود مباشرة.

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'method_not_allowed' });
  }

  let body = req.body;
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body);
    } catch {
      return res.status(400).json({ error: 'invalid_json' });
    }
  }

  const email = typeof body?.email === 'string' ? body.email.trim() : '';

  if (!email || email.length > 254 || !EMAIL_RE.test(email)) {
    return res.status(400).json({ error: 'invalid_email' });
  }

  // TODO: هنا تحط منطقك الحقيقي، مثلاً:
  // - حفظ الإيميل في قاعدة بيانات (Postgres/Supabase/Airtable)
  // - أو استدعاء خدمة إيميل (Resend/SendGrid) عشان تبعت رابط التسجيل
  //
  // await db.subscribers.insert({ email, createdAt: new Date() });

  return res.status(200).json({ ok: true });
}
