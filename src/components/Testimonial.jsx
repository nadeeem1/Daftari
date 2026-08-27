export default function Testimonial(props) {
  return (
    <section class="testimonial">
      <div class="wrap">
        <blockquote>
          <p>{props.t.quote}</p>
          <footer>
            <span class="q-name">{props.t.quoteName}</span>
            <span class="q-role">{props.t.qrole}</span>
          </footer>
        </blockquote>
      </div>
    </section>
  );
}