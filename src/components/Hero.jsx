import { createSignal, For } from 'solid-js';
import { countUp } from '../lib/countUp';
import { useOnScreen } from '../lib/useOnScreen';
import { ledgerRows, ledgerTargetTotal } from '../data/content';

export default function Hero(props) {
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
          <p class="eyebrow">{props.t.eyebrow}</p>
          <h1 innerHTML={props.t.h1} />
          <p class="hero-sub">{props.t.sub}</p>
          <div class="hero-cta">
            <a href="#signup" class="btn btn-primary">{props.t.cta1}</a>
            <a href="#how" class="btn btn-ghost">{props.t.cta2}</a>
          </div>
          <p class="hero-note">{props.t.note}</p>
        </div>

        <div class="hero-visual" aria-hidden="true" ref={ref}>
          <div class="ledger">
            <div class="ledger-head">
              <span>{props.t.ledgerTitle}</span>
              <span class="ledger-total-label">{props.t.ledgerTotalLabel}</span>
            </div>
            <div class="ledger-body">
              <ul class="ledger-rows">
                <For each={ledgerRows}>
                  {(row, i) => (
                    <li class="ledger-row" style={{ '--d': i() }}>
                      <span class="lr-client">{row.client}</span>
                      <span class={`lr-status ${row.status}`}>{props.t[row.status]}</span>
                      <span class="lr-amt">{row.amt}</span>
                    </li>
                  )}
                </For>
              </ul>
            </div>
            <div class="ledger-foot">
              <span>{props.t.ledgerRunning}</span>
              <span class="ledger-total-num">{total().toLocaleString('en-US')}</span>
            </div>
            <span class={`ledger-stamp ${stamped() ? 'is-stamped' : ''}`} role="presentation">
              <span class="stamp-main">{props.t.ledgerStamp}</span>
              <span class="stamp-sub">{props.t.ledgerStampLine}</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}