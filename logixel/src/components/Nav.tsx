import './nav.css';

export function Nav() {
  return (
    <header className="nav">
      <a href="#top" className="nav-brand">
        <svg width="22" height="22" viewBox="0 0 32 32" fill="none" aria-hidden="true">
          <rect width="32" height="32" rx="7" fill="#0B0D12" />
          <circle cx="9" cy="16" r="3" fill="#3E7BFA" />
          <circle cx="23" cy="9" r="2.4" fill="#8FB4FF" />
          <circle cx="23" cy="23" r="2.4" fill="#8FB4FF" />
          <path d="M11.6 14.7 20.6 10.3M11.6 17.3 20.6 21.7" stroke="#3E7BFA" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
        <span>LOGIXEL</span>
      </a>
      <nav className="nav-links" aria-label="Primary">
        <a href="#work">What we build</a>
        <a href="#systems">Systems</a>
        <a href="#contact">Contact</a>
      </nav>
      <a href="#contact" className="nav-cta">
        Start a build
      </a>
    </header>
  );
}
