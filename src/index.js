import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Link, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import PrivacyPolicy from './PrivacyPolicy';
import TermsConditions from './TermsConditions';
import OurStory from './OurStory';
import Founders from './Founders';
import CreateAccount from './CreateAccount';
import SiteLayout from './SiteLayout';
import './App.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-conditions" element={<TermsConditions />} />
        <Route path="/our-story" element={<OurStory />} />
        <Route path="/founders" element={<Founders />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="*" element={<SiteLayout><section className="section-shell page-intro"><p className="eyebrow">Page not found</p><h1>A page still<br /><em>unwritten.</em></h1><Link to="/" className="button button-primary">Back to Alkkemi</Link></section></SiteLayout>} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
