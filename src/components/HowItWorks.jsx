import { For } from 'solid-js';

const steps = [
  { num: '01', title: 'Log the work', desc: 'Open the project, start the timer, or add hours yourself at day\u2019s end.' },
  { num: '02', title: 'Generate the invoice', desc: 'Daftari totals hours and expenses into a ready invoice in one click.' },
  { num: '03', title: 'Track and get paid', desc: 'You\u2019re notified the moment your client views or pays the invoice.' }
];

export default function HowItWorks() {
  return (
    <section id="how" class="how">
      <div class="wrap">
        <h2 class="section-title">From the first hour to getting paid</h2>
        <ol class="how-steps">
          <For each={steps}>
            {(step) => (
              <li class="how-step">
                <span class="step-num">{step.num}</span>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </li>
            )}
          </For>
        </ol>
      </div>
    </section>
  );
}