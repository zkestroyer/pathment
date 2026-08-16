import React, { useState } from 'react';
import { Link } from 'react-router';
import { useSelector } from 'react-redux';
import { FiShoppingCart, FiUser, FiMenu, FiX } from 'react-icons/fi';

const Navbar = () => {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { cart } = useSelector((state) => state.cart);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-glass">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-accent">Eshop</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden sm:flex sm:items-center sm:space-x-8">
            <Link to="/" className="text-gray-700 hover:text-accent px-3 py-2 rounded-md text-sm font-medium">Home</Link>
            <Link to="/products" className="text-gray-700 hover:text-accent px-3 py-2 rounded-md text-sm font-medium">Products</Link>
            
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <Link to="/cart" className="relative p-2 text-gray-700 hover:text-accent transition-colors">
                  <FiShoppingCart className="h-6 w-6" />
                  {cart && cart.length > 0 && (
                    <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-accent rounded-full">
                      {cart.length}
                    </span>
                  )}
                </Link>
                <div className="relative">
                  <button className="flex items-center space-x-2 p-2 text-gray-700 hover:text-accent transition-colors">
                    {user?.avatar?.url ? (
                      <img src={user.avatar.url} alt="avatar" className="w-8 h-8 rounded-full object-cover" />
                    ) : (
                      <FiUser className="h-6 w-6" />
                    )}
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login" className="text-gray-700 hover:text-accent px-3 py-2 rounded-md text-sm font-medium">Login</Link>
                <Link to="/register" className="btn-primary px-4 py-2 text-sm">Sign Up</Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center sm:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-accent"
            >
              {isMenuOpen ? <FiX className="block h-6 w-6" /> : <FiMenu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="sm:hidden bg-white border-t">
          <div className="pt-2 pb-3 space-y-1">
            <Link to="/" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-accent hover:bg-gray-50">Home</Link>
            <Link to="/products" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-accent hover:bg-gray-50">Products</Link>
            {isAuthenticated ? (
              <>
                <Link to="/cart" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-accent hover:bg-gray-50">Cart ({cart?.length || 0})</Link>
                <div className="block px-3 py-2 text-base font-medium text-gray-700">Profile</div>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-accent hover:bg-gray-50">Login</Link>
                <Link to="/register" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-accent hover:bg-gray-50">Sign Up</Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
