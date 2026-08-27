import { createSignal, For } from 'solid-js';
import { countUp } from '../lib/countUp';
import { useOnScreen } from '../lib/useOnScreen';
import { ledgerRows, ledgerTargetTotal } from '../data/content';

export default function Hero() {
  const [total, setTotal] = createSignal(0);
  const [stamped, setStamped] = createSignal(false);

  const ref = useOnScreen(() => {
    countUp(setTotal, ledgerTargetTotal, { duration: 1600 });
    setStamped(true);
  }, { threshold: 0.3 });

  return (
    <section class="hero">
      <div class="wrap hero-inner">
        <div class="hero-copy">
          <p class="eyebrow">For freelancers juggling more than one client</p>
          <h1 innerHTML="Your ledger…<br /><span class=&quot;accent&quot;>just digital and tidy.</span>" />
          <p class="hero-sub">
            Track your hours, send professional invoices in any currency, and see who paid and who
            hasn&rsquo;t &mdash; all in one place, built around how freelancers actually work.
          </p>
          <div class="hero-cta">
            <a href="#signup" class="btn btn-primary">Start your free ledger</a>
            <a href="#how" class="btn btn-ghost">See how it works</a>
          </div>
          <p class="hero-note">No credit card · Up and running in 2 minutes</p>
        </div>

        <div class="hero-visual" aria-hidden="true" ref={ref}>
          <div class="ledger">
            <div class="ledger-head">
              <span>This month&rsquo;s invoices</span>
              <span class="ledger-total-label">Total</span>
            </div>
            <div class="ledger-body">
              <ul class="ledger-rows">
                <For each={ledgerRows}>
                  {(row, i) => (
                    <li class="ledger-row" style={{ '--d': i() }}>
                      <span class="lr-client">{row.client}</span>
                      <span class={`lr-status ${row.status}`}>
                        {row.status === 'paid' ? 'Paid' : 'Pending'}
                      </span>
                      <span class="lr-amt">{row.amt}</span>
                    </li>
                  )}
                </For>
              </ul>
            </div>
            <div class="ledger-foot">
              <span>Total collected</span>
              <span class="ledger-total-num">{total().toLocaleString('en-US')}</span>
            </div>
            <span class={`ledger-stamp ${stamped() ? 'is-stamped' : ''}`} role="presentation">
              <span class="stamp-main">BALANCED</span>
              <span class="stamp-sub">Ledger · Aug 2026</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}