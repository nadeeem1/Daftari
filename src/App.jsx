import { createSignal, createMemo, onMount } from 'solid-js';
import translations, { LANG_STORAGE_KEY } from './translations';
import Header from './components/Header';
import Hero from './components/Hero';
import StatsStrip from './components/StatsStrip';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import Testimonial from './components/Testimonial';
import Pricing from './components/Pricing';
import Signup from './components/Signup';
import Footer from './components/Footer';

export default function App() {
  const [lang, setLang] = createSignal('ar');
  const dict = createMemo(() => translations[lang()]);

  const applyLang = (next) => {
    setLang(next);
    document.documentElement.lang = next;
    document.documentElement.dir = next === 'ar' ? 'rtl' : 'ltr';
    try {
      localStorage.setItem(LANG_STORAGE_KEY, next);
    } catch {
      /* وضع تصفح خاص — نتجاهل بهدوء */
    }
  };

  onMount(() => {
    try {
      const saved = localStorage.getItem(LANG_STORAGE_KEY);
      if (saved === 'en') applyLang('en');
    } catch {
      /* وضع تصفح خاص */
    }
  });

  function toggleLang() {
    const next = lang() === 'ar' ? 'en' : 'ar';
    // View Transitions API لو المتصفح بيدعمها، وإلا تبديل فوري
    if (document.startViewTransition) {
      document.startViewTransition(() => applyLang(next));
    } else {
      applyLang(next);
    }
  }

  return (
    <>
      <a href="#main" class="skip-link">{dict().skipToContent}</a>
      <Header t={dict()} lang={lang} onToggleLang={toggleLang} />
      <main id="main">
        <Hero t={dict()} />
        <StatsStrip t={dict()} />
        <Features t={dict()} />
        <HowItWorks t={dict()} />
        <Testimonial t={dict()} />
        <Pricing t={dict()} />
        <Signup t={dict()} />
      </main>
      <Footer t={dict()} />
    </>
  );
}