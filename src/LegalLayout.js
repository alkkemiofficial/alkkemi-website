import React from 'react';
import SiteLayout from './SiteLayout';
export default function LegalLayout({ title, lastUpdated, children }) {
  return <SiteLayout><article className="section-shell legal-page"><p className="eyebrow">Alkkemi · Legal</p><h1>{title}</h1>{lastUpdated && <p className="legal-updated">Last updated: {lastUpdated}</p>}<div className="legal-content">{children}</div></article></SiteLayout>;
}
