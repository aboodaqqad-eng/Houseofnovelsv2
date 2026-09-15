import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import { MenuProvider } from './context/MenuContext.jsx';
import { LangProvider, useLang, categoryNames } from './context/LangContext.jsx';
import symbol from './assets/symbol.png';
import MenusPage from './MenusPage.jsx';
import Home from './Home.jsx';
import Catering from './Catering.jsx';
import './theme.css';

function Nav() {
  const { lang } = useLang();

  const navLinkStyle = ({ isActive }) => ({
    fontSize: '0.78rem', color: 'var(--navy-deep)', opacity: isActive ? 1 : 0.7, textDecoration: 'none',
    borderBottom: isActive ? '2px solid var(--orange)' : '2px solid transparent',
    padding: '4px 2px', whiteSpace: 'nowrap', letterSpacing: '0.1em',
  });

  return (
    <header style={{
      background: 'var(--off-white)', padding: '18px 32px',
      display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center', gap: 20,
      borderBottom: '1px solid rgba(24,38,67,0.25)',
    }}>
      <NavLink to="/" style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none', justifySelf: 'start' }}>
        <img src={symbol} alt="House of Novéls" style={{ height: 44 }} />
        <span className="serif" style={{ fontStyle: 'italic', fontSize: '1.15rem', color: 'var(--navy-deep)', whiteSpace: 'nowrap' }}>
          House of Novéls
        </span>
      </NavLink>
      <nav style={{ display: 'flex', gap: 'clamp(20px, 4vw, 48px)', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', justifySelf: 'center' }}>
        <NavLink to="/" end className="label" style={navLinkStyle}>Home</NavLink>
        <NavLink to="/menu" end className="label" style={navLinkStyle}>Menu</NavLink>
        <NavLink to="/menu/catering" className="label" style={navLinkStyle}>
          {categoryNames.catering[lang]}
        </NavLink>
      </nav>
      <div />
    </header>
  );
}

const footerLink = {
  color: 'var(--off-white)', textDecoration: 'none', opacity: 0.85, fontSize: '0.8rem',
};

function Footer() {
  return (
    <footer style={{
      background: 'var(--olive)', color: 'var(--off-white)', textAlign: 'center', flex: '0 0 auto',
      padding: 'clamp(24px, 4vh, 40px) 24px',
    }}>
      <p className="label" style={{ fontSize: '0.68rem', letterSpacing: '0.2em', opacity: 0.9 }}>
        House of Novéls
      </p>
      <p className="label" style={{ fontSize: '0.65rem', opacity: 0.8, marginTop: 12 }}>
        Riyadh, Saudi Arabia · Daily 8:00 — 23:00
      </p>
      <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap', marginTop: 14 }}>
        <a href="tel:+966562322224" style={footerLink}>+966 56 232 2224</a>
        <a href="tel:+966549780998" style={footerLink}>+966 54 978 0998</a>
        <a href="https://api.whatsapp.com/send/?phone=%2B966549780998&text&type=phone_number&app_absent=0" target="_blank" rel="noreferrer" style={footerLink}>WhatsApp</a>
        <a href="https://www.instagram.com/novels_bakery" target="_blank" rel="noreferrer" style={footerLink}>Instagram</a>
        <span style={{ ...footerLink, opacity: 0.5, cursor: 'default' }} title="TikTok link pending from client">TikTok</span>
      </div>
    </footer>
  );
}

function SiteShell() {
  const { dir } = useLang();
  return (
    <div dir={dir} style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Nav />
      <main style={{ flex: '1 0 auto' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<MenusPage />} />
          <Route path="/menu/catering" element={<Catering />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <LangProvider>
        <MenuProvider>
          <SiteShell />
        </MenuProvider>
      </LangProvider>
    </BrowserRouter>
  );
}
