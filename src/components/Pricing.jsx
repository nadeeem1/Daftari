export default function Pricing() {
  return (
    <section id="pricing" class="pricing">
      <div class="wrap">
        <h2 class="section-title">Start free, upgrade as you grow</h2>
        <div class="pricing-grid">
          <div class="price-card">
            <h3>Personal</h3>
            <p class="price-amt">0<span> EGP / month</span></p>
            <ul>
              <li>3 clients</li>
              <li>Unlimited time tracking</li>
              <li>5 invoices / month</li>
            </ul>
            <a href="#signup" class="btn btn-ghost btn-block">Start now</a>
          </div>
          <div class="price-card highlighted">
            <span class="price-badge">Most popular</span>
            <h3>Pro</h3>
            <p class="price-amt">249<span> EGP / month</span></p>
            <ul>
              <li>Unlimited clients</li>
              <li>Unlimited invoices</li>
              <li>Client payment portal</li>
              <li>Monthly reports</li>
            </ul>
            <a href="#signup" class="btn btn-primary btn-block">Try 14 days free</a>
          </div>
        </div>
      </div>
    </section>
  );
}