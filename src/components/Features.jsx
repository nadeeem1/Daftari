import { For } from 'solid-js';

const icons = {
  clock: (
    <svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true">
      <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="1.4" />
      <path d="M12 7v5l3.5 2" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" />
    </svg>
  ),
  invoice: (
    <svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true">
      <rect x="4" y="3" width="16" height="18" rx="1.5" fill="none" stroke="currentColor" stroke-width="1.4" />
      <path d="M8 8h8M8 12h8M8 16h5" stroke="currentColor" stroke-width="1.2" />
    </svg>
  ),
  currency: (
    <svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true">
      <path d="M4 17l5-5 4 4 7-8" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  ),
  portal: (
    <svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true">
      <path d="M4 20c0-4 4-6 8-6s8 2 8 6" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" />
      <circle cx="12" cy="7" r="3.2" fill="none" stroke="currentColor" stroke-width="1.4" />
    </svg>
  )
};

const features = [
  { id: 'f1', icon: 'clock' },
  { id: 'f2', icon: 'invoice' },
  { id: 'f3', icon: 'currency' },
  { id: 'f4', icon: 'portal' }
];

export default function Features(props) {
  return (
    <section id="features" class="features">
      <div class="wrap">
        <h2 class="section-title">{props.t.featTitle}</h2>
        <p class="section-sub">{props.t.featSub}</p>

        <div class="feature-grid cq-container">
          <For each={features}>
            {(feature) => (
              <article class="feature-card">
                <div class="feature-icon">{icons[feature.icon]}</div>
                <h3>{props.t[`${feature.id}t`]}</h3>
                <p>{props.t[`${feature.id}d`]}</p>
              </article>
            )}
          </For>
        </div>
      </div>
    </section>
  );
}