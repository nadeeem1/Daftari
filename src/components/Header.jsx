function LangToggle(props) {
  return (
    <button
      type="button"
      class="lang-toggle"
      onClick={props.onToggle}
      aria-label={props.nextLabel}
    >
      {props.label}
    </button>
  );
}

export default function Header(props) {
  const isAr = () => props.lang() === 'ar';

  return (
    <header class="site-header">
      <div class="wrap header-inner">
        <a href="#" class="logo" aria-label="دفتري">
          <span class="logo-mark" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="22" height="22">
              <path d="M4 2h13l3 3v17H4z" fill="none" stroke="currentColor" stroke-width="1.4" />
              <path d="M7 8h10M7 12h10M7 16h6" stroke="currentColor" stroke-width="1.2" />
            </svg>
          </span>
          دفتري
        </a>
        <nav class="main-nav" aria-label={isAr() ? 'التنقّل الرئيسي' : 'Main navigation'}>
          <a href="#features">{props.t.navFeatures}</a>
          <a href="#how">{props.t.navHow}</a>
          <a href="#pricing">{props.t.navPricing}</a>
        </nav>
        <div class="header-actions">
          <LangToggle
            label={isAr() ? 'EN' : 'AR'}
            nextLabel={isAr() ? 'Switch to English' : 'التبديل للعربي'}
            onToggle={props.onToggleLang}
          />
          <a href="#signup" class="btn btn-primary btn-sm">{props.t.navCta}</a>
        </div>
      </div>
    </header>
  );
}