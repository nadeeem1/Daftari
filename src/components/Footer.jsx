export default function Footer(props) {
  return (
    <footer class="site-footer">
      <div class="wrap footer-inner">
        <span>© 2026 دفتري. {props.t.footerRights}</span>
        <div class="footer-links">
          <a href="#" rel="noopener noreferrer">{props.t.footerPrivacy}</a>
          <a href="#" rel="noopener noreferrer">{props.t.footerTerms}</a>
          <a href="mailto:hello@example.com">{props.t.footerContact}</a>
        </div>
      </div>
    </footer>
  );
}