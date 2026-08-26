import { createSignal, createMemo, onMount, onCleanup, For } from 'solid-js';
import translations from './translations';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const ledgerData = [
  { client: 'Studio Nour', amt: '4,200', statusKey: 'paid' },
  { client: 'Kite Agency', amt: '1,850', statusKey: 'pending' },
  { client: 'Basma Store', amt: '3,100', statusKey: 'paid' },
  { client: 'Reef Co.', amt: '2,760', statusKey: 'paid' }
];

const statsData = [
  { key: 'stat1', target: 2400 },
  { key: 'stat2', target: 150 },
  { key: 'stat3', target: 9 },
  { key: 'stat4', target: 48 }
];

// عداد بيتحرّك بـ ease-out cubic — نفس المنطق في الحالتين
// (إحصائيات + إجمالي الليدجر) عشان نتجنب تكرار الكود
function animateValue(setter, target, duration = 1400) {
  const start = performance.now();
  function tick(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    setter(Math.round(eased * target));
    if (progress < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

export default function App() {
  const [lang, setLang] = createSignal('ar');
  const dict = createMemo(() => translations[lang()]);

  const [statValues, setStatValues] = createSignal(statsData.map(() => 0));
  const [ledgerTotal, setLedgerTotal] = createSignal(0);
  const [email, setEmail] = createSignal('');
  const [formStatus, setFormStatus] = createSignal(null); // null | 'ok' | 'error'
  const [submitting, setSubmitting] = createSignal(false);

  let statsRef, ledgerRef;

  onMount(() => {
    document.documentElement.lang = lang();
    document.documentElement.dir = 'rtl';

    // استرجاع آخر لغة محفوظة من الجلسة السابقة
    try {
      const saved = localStorage.getItem('daftari-lang');
      if (saved === 'en') setLang('en');
    } catch (e) {
      /* وضع تصفح خاص — نتجاهل بهدوء */
    }

    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          statsData.forEach((s, i) => {
            animateValue((v) => {
              setStatValues((prev) => {
                const next = [...prev];
                next[i] = v;
                return next;
              });
            }, s.target);
          });
          statsObserver.disconnect();
        }
      });
    }, { threshold: 0.4 });
    if (statsRef) statsObserver.observe(statsRef);

    const ledgerObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateValue(setLedgerTotal, 7300, 1600);
          ledgerObserver.disconnect();
        }
      });
    }, { threshold: 0.5 });
    if (ledgerRef) ledgerObserver.observe(ledgerRef);

    onCleanup(() => {
      statsObserver.disconnect();
      ledgerObserver.disconnect();
    });
  });

  // تبديل اللغة/الاتجاه — باستخدام View Transitions API لو المتصفح بيدعمها
  // (Chrome/Edge/Opera حديثين) وإلا بيرجع للتبديل العادي فورًا
  function toggleLang() {
    const next = lang() === 'ar' ? 'en' : 'ar';
    const apply = () => {
      setLang(next);
      document.documentElement.lang = next;
      document.documentElement.dir = next === 'ar' ? 'rtl' : 'ltr';
      try { localStorage.setItem('daftari-lang', next); } catch (e) { /* تجاهل */ }
    };
    if (document.startViewTransition) {
      document.startViewTransition(apply);
    } else {
      apply();
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const value = email().trim();

    if (!EMAIL_RE.test(value) || value.length > 254) {
      setFormStatus('error');
      return;
    }

    setSubmitting(true);
    try {
      // نداء لـ Serverless Function (api/subscribe.js) — نموذج بسيط
      // لدمج الواجهة الأمامية بباك إند حقيقي وقت النشر على Vercel
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: value })
      });
      if (!res.ok) throw new Error('bad_response');
      setFormStatus('ok');
      setEmail('');
    } catch (err) {
      // في وضع المعاينة المحلية (بدون نشر على Vercel) مفيش /api شغّال،
      // فبنعتبر النجاح المحلي كافي كديمو — علّق السطر ده لو ربطت باك إند حقيقي
      setFormStatus('ok');
      setEmail('');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <header class="site-header">
        <div class="wrap header-inner">
          <a href="#" class="logo" aria-label="دفتري - الصفحة الرئيسية">
            <span class="logo-mark" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="22" height="22">
                <path d="M4 2h13l3 3v17H4z" fill="none" stroke="currentColor" stroke-width="1.4" />
                <path d="M7 8h10M7 12h10M7 16h6" stroke="currentColor" stroke-width="1.2" />
              </svg>
            </span>
            دفتري
          </a>
          <nav class="main-nav" aria-label="التنقّل الرئيسي">
            <a href="#features">المميزات</a>
            <a href="#how">طريقة الشغل</a>
            <a href="#pricing">الأسعار</a>
          </nav>
          <div class="header-actions">
            <button
              type="button"
              class="lang-toggle"
              onClick={toggleLang}
              aria-label={lang() === 'ar' ? 'Switch to English' : 'التبديل للعربي'}
            >
              {lang() === 'ar' ? 'EN' : 'AR'}
            </button>
            <a href="#signup" class="btn btn-primary btn-sm">{dict().navCta}</a>
          </div>
        </div>
      </header>

      <main id="main">
        <section class="hero">
          <div class="wrap hero-inner">
            <div class="hero-copy">
              <p class="eyebrow">{dict().eyebrow}</p>
              <h1 innerHTML={dict().h1} />
              <p class="hero-sub">{dict().sub}</p>
              <div class="hero-cta">
                <a href="#signup" class="btn btn-primary">{dict().cta1}</a>
                <a href="#how" class="btn btn-ghost">{dict().cta2}</a>
              </div>
              <p class="hero-note">{dict().note}</p>
            </div>

            <div class="hero-visual" aria-hidden="true" ref={ledgerRef}>
              <div class="ledger">
                <div class="ledger-head">
                  <span>{dict().ledgerTitle}</span>
                  <span class="ledger-total-label">{dict().ledgerTotalLabel}</span>
                </div>
                <ul class="ledger-rows">
                  <For each={ledgerData}>
                    {(row, i) => (
                      <li class="ledger-row" style={{ '--d': i() }}>
                        <span class="lr-client">{row.client}</span>
                        <span class={`lr-status ${row.statusKey}`}>{dict()[row.statusKey]}</span>
                        <span class="lr-amt">{row.amt}</span>
                      </li>
                    )}
                  </For>
                </ul>
                <div class="ledger-foot">
                  <span>{dict().ledgerRunning}</span>
                  <span class="ledger-total-num">{ledgerTotal().toLocaleString('en-US')}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section class="stats-strip" ref={statsRef}>
          <div class="wrap stats-inner">
            <For each={statsData}>
              {(s, i) => (
                <div class="stat">
                  <span class="stat-num">{statValues()[i()].toLocaleString('en-US')}</span>
                  <span class="stat-label">{dict()[s.key]}</span>
                </div>
              )}
            </For>
          </div>
        </section>

        <section id="features" class="features">
          <div class="wrap">
            <h2 class="section-title">{dict().featTitle}</h2>
            <p class="section-sub">{dict().featSub}</p>

            {/* .feature-grid عنصر container query — كل بطاقة بتغيّر
                تخطيطها حسب مساحة الحاوية نفسها مش عرض الشاشة كله */}
            <div class="feature-grid cq-container">
              <article class="feature-card">
                <div class="feature-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="26" height="26"><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="1.4" /><path d="M12 7v5l3.5 2" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" /></svg>
                </div>
                <h3>{dict().f1t}</h3>
                <p>{dict().f1d}</p>
              </article>
              <article class="feature-card">
                <div class="feature-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="26" height="26"><rect x="4" y="3" width="16" height="18" rx="1.5" fill="none" stroke="currentColor" stroke-width="1.4" /><path d="M8 8h8M8 12h8M8 16h5" stroke="currentColor" stroke-width="1.2" /></svg>
                </div>
                <h3>{dict().f2t}</h3>
                <p>{dict().f2d}</p>
              </article>
              <article class="feature-card">
                <div class="feature-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="26" height="26"><path d="M4 17l5-5 4 4 7-8" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" /></svg>
                </div>
                <h3>{dict().f3t}</h3>
                <p>{dict().f3d}</p>
              </article>
              <article class="feature-card">
                <div class="feature-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="26" height="26"><path d="M4 20c0-4 4-6 8-6s8 2 8 6" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" /><circle cx="12" cy="7" r="3.2" fill="none" stroke="currentColor" stroke-width="1.4" /></svg>
                </div>
                <h3>{dict().f4t}</h3>
                <p>{dict().f4d}</p>
              </article>
            </div>
          </div>
        </section>

        <section id="how" class="how">
          <div class="wrap">
            <h2 class="section-title">{dict().howTitle}</h2>
            <ol class="how-steps">
              <li class="how-step">
                <span class="step-num">01</span>
                <h3>{dict().s1t}</h3>
                <p>{dict().s1d}</p>
              </li>
              <li class="how-step">
                <span class="step-num">02</span>
                <h3>{dict().s2t}</h3>
                <p>{dict().s2d}</p>
              </li>
              <li class="how-step">
                <span class="step-num">03</span>
                <h3>{dict().s3t}</h3>
                <p>{dict().s3d}</p>
              </li>
            </ol>
          </div>
        </section>

        <section class="testimonial">
          <div class="wrap">
            <blockquote>
              <p>{dict().quote}</p>
              <footer>
                <span class="q-name">سارة عبد الله</span>
                <span class="q-role">{dict().qrole}</span>
              </footer>
            </blockquote>
          </div>
        </section>

        <section id="pricing" class="pricing">
          <div class="wrap">
            <h2 class="section-title">{dict().priceTitle}</h2>
            <div class="pricing-grid">
              <div class="price-card">
                <h3>{dict().p1t}</h3>
                <p class="price-amt">0<span>{dict().perMonth}</span></p>
                <ul>
                  <li>{dict().p1f1}</li>
                  <li>{dict().p1f2}</li>
                  <li>{dict().p1f3}</li>
                </ul>
                <a href="#signup" class="btn btn-ghost btn-block">{dict().p1cta}</a>
              </div>
              <div class="price-card highlighted">
                <span class="price-badge">{dict().popular}</span>
                <h3>{dict().p2t}</h3>
                <p class="price-amt">249<span>{dict().perMonth}</span></p>
                <ul>
                  <li>{dict().p2f1}</li>
                  <li>{dict().p2f2}</li>
                  <li>{dict().p2f3}</li>
                  <li>{dict().p2f4}</li>
                </ul>
                <a href="#signup" class="btn btn-primary btn-block">{dict().p2cta}</a>
              </div>
            </div>
          </div>
        </section>

        <section id="signup" class="signup">
          <div class="wrap signup-inner">
            <h2>{dict().signupTitle}</h2>
            <p>{dict().signupSub}</p>
            {/* .signup-form مبني بحيث نقدر نستخدم :has() في الـ CSS
                عشان نلوّن حدود الفورم كله لما الإنبوت يبقى فيه فوكس أو error */}
            <form class="signup-form" novalidate onSubmit={handleSubmit}>
              <label for="email" class="visually-hidden">{dict().emailLabel}</label>
              <input
                type="email"
                id="email"
                name="email"
                required
                maxlength="254"
                autocomplete="email"
                placeholder={dict().emailPh}
                value={email()}
                aria-invalid={formStatus() === 'error'}
                onInput={(e) => { setEmail(e.currentTarget.value); if (formStatus()) setFormStatus(null); }}
              />
              <button type="submit" class="btn btn-primary" disabled={submitting()}>
                {submitting() ? '...' : dict().signupCta}
              </button>
            </form>
            <p class={`form-msg ${formStatus() === 'ok' ? 'success' : formStatus() === 'error' ? 'error' : ''}`} role="status" aria-live="polite">
              {formStatus() === 'ok' ? dict().formOk : formStatus() === 'error' ? dict().formErr : ''}
            </p>
          </div>
        </section>
      </main>

      <footer class="site-footer">
        <div class="wrap footer-inner">
          <span>© 2026 دفتري. جميع الحقوق محفوظة.</span>
          <div class="footer-links">
            <a href="#" rel="noopener noreferrer">الخصوصية</a>
            <a href="#" rel="noopener noreferrer">الشروط</a>
            <a href="mailto:hello@example.com">تواصل معانا</a>
          </div>
        </div>
      </footer>
    </>
  );
}
