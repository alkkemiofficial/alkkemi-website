import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from './Footer';

const LegalLayout = ({ title, lastUpdated, children }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <img
              src="/logo.png"
              alt="Alkkemi"
              className="h-10 object-contain"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'inline-block';
              }}
            />
            <span className="font-semibold text-lg text-gray-800 hidden">Alkkemi</span>
          </Link>
          <Link
            to="/"
            className="text-gray-600 hover:text-blue-600 transition-colors duration-300 text-sm font-medium"
          >
            ← Back to Home
          </Link>
        </div>
      </nav>

      <main className="flex-1 container mx-auto px-6 py-16 max-w-3xl">
        <h1 className="text-3xl lg:text-4xl font-light text-gray-800 mb-2">{title}</h1>
        {lastUpdated && (
          <p className="text-sm text-gray-500 mb-12">Last updated: {lastUpdated}</p>
        )}
        <div className="text-gray-700 leading-relaxed">{children}</div>
      </main>

      <Footer />
    </div>
  );
};

export default LegalLayout;
