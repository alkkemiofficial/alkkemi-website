import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-slate-950 text-gray-400 py-10 border-t border-white border-opacity-10">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm">&copy; {new Date().getFullYear()} Alkkemi LLC. All rights reserved.</p>
        <div className="flex gap-8 text-sm">
          <Link to="/privacy-policy" className="hover:text-white transition-colors duration-300">
            Privacy Policy
          </Link>
          <Link to="/terms-conditions" className="hover:text-white transition-colors duration-300">
            Terms &amp; Conditions
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
