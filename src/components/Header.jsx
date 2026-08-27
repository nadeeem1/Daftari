export default function Header() {
  return (
    <header class="site-header">
      <div class="wrap header-inner">
        <a href="#" class="logo" aria-label="Daftari">
          <span class="logo-mark" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="22" height="22">
              <path d="M4 2h13l3 3v17H4z" fill="none" stroke="currentColor" stroke-width="1.4" />
              <path d="M7 8h10M7 12h10M7 16h6" stroke="currentColor" stroke-width="1.2" />
            </svg>
          </span>
          Daftari
        </a>
        <nav class="main-nav" aria-label="Main navigation">
          <a href="#features">Features</a>
          <a href="#how">How it works</a>
          <a href="#pricing">Pricing</a>
        </nav>
        <div class="header-actions">
          <a href="#signup" class="btn btn-primary btn-sm">Try free</a>
        </div>
      </div>
    </header>
  );
}