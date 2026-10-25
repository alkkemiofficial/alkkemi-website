import React from 'react';
import SiteLayout from './SiteLayout';
import { Link } from 'react-router-dom';
// REPLACE ASSETS/COPY: existing founder photos and credentials retained.
const founders = [
  { name: 'Rachel Krantz', role: 'CEO & Founder', education: ['BA in Entrepreneurship & Business Analytics', 'East Asian Languages'], image: '/rachel.jpg', linkedin: 'https://linkedin.com/in/rakrantz/' },
  { name: 'Deepak Pagadala', role: 'CTO & Founder', education: ['B.Tech in Computer Science Engineering', 'MS in Data Science'], image: '/deepak.jpg', linkedin: 'https://linkedin.com/in/nagadeepakpagadala' }
];
export default function Founders() {
  return <SiteLayout><section className="section-shell page-intro"><p className="eyebrow">Meet the founders</p><h1>Two perspectives.<br /><em>One shared mission.</em></h1><p className="intro-description">Bringing business, language, and technology together to help you find your own way into a new language.</p></section><section className="section-shell founders-grid" aria-label="Alkkemi founders">{founders.map(founder => <article className="founder" key={founder.name}><div className="founder-photo"><img src={founder.image} alt={founder.name} width="600" height="650" /><span>{founder.role}</span></div><div className="founder-details"><h2>{founder.name}</h2><p>{founder.education.map(line => <React.Fragment key={line}>{line}<br /></React.Fragment>)}</p><a className="text-link" href={founder.linkedin} target="_blank" rel="noopener noreferrer" aria-label={`Connect with ${founder.name} on LinkedIn (opens in a new tab)`}>Connect on LinkedIn <span aria-hidden="true">↗</span></a></div></article>)}</section><section className="section-shell page-ending"><p className="eyebrow">The idea that connects us</p><h2>Language learning,<br /><em>one story at a time.</em></h2><Link to="/our-story" className="text-link">Read our story <span aria-hidden="true">↗</span></Link></section></SiteLayout>;
}
