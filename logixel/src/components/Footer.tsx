import './footer.css';

export function Footer() {
  return (
    <footer className="footer" id="contact">
      <div className="footer-brand">LOGIXEL</div>
      <p className="footer-copy">AI automation and custom systems, engineered around your business.</p>
      <a className="footer-mail" href="mailto:hello@logixel.tech">
        hello@logixel.tech
      </a>
      <p className="footer-legal">© {new Date().getFullYear()} LOGIXEL Technologies.</p>
    </footer>
  );
}
