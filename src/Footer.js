import React from 'react';
import { Link } from 'react-router-dom';
export default function Footer() {
  return <footer className="site-footer"><div className="section-shell"><div className="footer-top"><Link className="brand" to="/">alkkemi<span className="brand-dot">.</span></Link><p>A little curiosity. A little consistency.<br />A whole new world of words.</p><a className="text-link" href="mailto:alkkemi.official@gmail.com">Say hello <span aria-hidden="true">↗</span></a></div><div className="footer-bottom"><p>© {new Date().getFullYear()} Alkkemi LLC</p><nav aria-label="Footer navigation"><Link to="/our-story">Our story</Link><Link to="/founders">The founders</Link><Link to="/privacy-policy">Privacy policy</Link><Link to="/terms-conditions">Terms & conditions</Link></nav></div></div></footer>;
}
