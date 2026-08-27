export default function Pricing(props) {
  return (
    <section id="pricing" class="pricing">
      <div class="wrap">
        <h2 class="section-title">{props.t.priceTitle}</h2>
        <div class="pricing-grid">
          <div class="price-card">
            <h3>{props.t.p1t}</h3>
            <p class="price-amt">0<span>{props.t.perMonth}</span></p>
            <ul>
              <li>{props.t.p1f1}</li>
              <li>{props.t.p1f2}</li>
              <li>{props.t.p1f3}</li>
            </ul>
            <a href="#signup" class="btn btn-ghost btn-block">{props.t.p1cta}</a>
          </div>
          <div class="price-card highlighted">
            <span class="price-badge">{props.t.popular}</span>
            <h3>{props.t.p2t}</h3>
            <p class="price-amt">249<span>{props.t.perMonth}</span></p>
            <ul>
              <li>{props.t.p2f1}</li>
              <li>{props.t.p2f2}</li>
              <li>{props.t.p2f3}</li>
              <li>{props.t.p2f4}</li>
            </ul>
            <a href="#signup" class="btn btn-primary btn-block">{props.t.p2cta}</a>
          </div>
        </div>
      </div>
    </section>
  );
}