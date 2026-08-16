import React from 'react';
import { Link } from 'react-router';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-10 pb-6 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-2xl font-bold text-accent mb-4">Eshop</h3>
            <p className="text-gray-400 text-sm">
              The best multi-vendor marketplace for all your needs. Quality products, competitive prices.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-400 hover:text-white text-sm">About Us</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-white text-sm">Contact</Link></li>
              <li><Link to="/terms" className="text-gray-400 hover:text-white text-sm">Terms & Conditions</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center hover:bg-accent cursor-pointer transition-colors">
                <span className="text-sm">FB</span>
              </div>
              <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center hover:bg-accent cursor-pointer transition-colors">
                <span className="text-sm">TW</span>
              </div>
              <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center hover:bg-accent cursor-pointer transition-colors">
                <span className="text-sm">IG</span>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">&copy; {new Date().getFullYear()} Eshop. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
