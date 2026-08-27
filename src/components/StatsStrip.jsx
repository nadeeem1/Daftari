import { createSignal, For } from 'solid-js';
import { countUp } from '../lib/countUp';
import { useOnScreen } from '../lib/useOnScreen';
import { stats } from '../data/content';

export default function StatsStrip() {
  const [values, setValues] = createSignal(stats.map(() => 0));

  const ref = useOnScreen(() => {
    stats.forEach((stat, i) => {
      countUp((value) => {
        setValues((prev) => prev.map((item, j) => (j === i ? value : item)));
      }, stat.target);
    });
  }, { threshold: 0.3 });

  return (
    <section class="stats-strip" ref={ref}>
      <div class="wrap stats-inner">
        <For each={stats}>
          {(stat, i) => (
            <div class="stat">
              <span class="stat-num">{values()[i()].toLocaleString('en-US')}</span>
              <span class="stat-label">{stat.label}</span>
            </div>
          )}
        </For>
      </div>
    </section>
  );
}