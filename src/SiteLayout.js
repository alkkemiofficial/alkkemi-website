import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import Footer from './Footer';
import { SignupLink } from './signup';

export default function SiteLayout({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  useEffect(() => { setMenuOpen(false); window.scrollTo(0, 0); }, [location.pathname]);
  useEffect(() => {
    const titles = { '/': 'Learn through stories', '/our-story': 'Our story', '/founders': 'Meet the founders', '/create-account': 'Create an account', '/privacy-policy': 'Privacy Policy', '/terms-conditions': 'Terms & Conditions' };
    document.title = `Alkkemi · ${titles[location.pathname] || 'Page not found'}`;
  }, [location.pathname]);
  useEffect(() => {
    if (!menuOpen) return;
    const onEscape = event => { if (event.key === 'Escape') { setMenuOpen(false); document.getElementById('menu-toggle')?.focus(); } };
    document.addEventListener('keydown', onEscape);
    return () => document.removeEventListener('keydown', onEscape);
  }, [menuOpen]);
  return <><a href="#main-content" className="skip-link">Skip to content</a><header className="site-header"><nav className="section-shell nav-shell" aria-label="Main navigation"><Link to="/" className="brand" aria-label="Alkkemi home"><img src="/logo.png" alt="" width="40" height="48" /><span>alkkemi<span className="brand-dot">.</span></span></Link><button id="menu-toggle" className="menu-toggle" aria-expanded={menuOpen} aria-controls="main-navigation" onClick={() => setMenuOpen(value => !value)}>{menuOpen ? 'Close' : 'Menu'} <span aria-hidden="true">{menuOpen ? '×' : '☰'}</span></button><div id="main-navigation" className={`nav-links ${menuOpen ? 'is-open' : ''}`}><NavLink to="/" end>Discover</NavLink><NavLink to="/our-story">Our story</NavLink><NavLink to="/founders">The founders</NavLink><SignupLink className="button button-small button-primary">Create an account <span aria-hidden="true">↗</span></SignupLink></div></nav></header><main id="main-content">{children}</main><Footer /></>;
}
