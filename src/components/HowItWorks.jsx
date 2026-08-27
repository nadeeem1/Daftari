import { For } from 'solid-js';

const steps = [
  { id: 's1', num: '01' },
  { id: 's2', num: '02' },
  { id: 's3', num: '03' }
];

export default function HowItWorks(props) {
  return (
    <section id="how" class="how">
      <div class="wrap">
        <h2 class="section-title">{props.t.howTitle}</h2>
        <ol class="how-steps">
          <For each={steps}>
            {(step) => (
              <li class="how-step">
                <span class="step-num">{step.num}</span>
                <h3>{props.t[`${step.id}t`]}</h3>
                <p>{props.t[`${step.id}d`]}</p>
              </li>
            )}
          </For>
        </ol>
      </div>
    </section>
  );
}