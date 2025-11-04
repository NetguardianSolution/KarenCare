// components/Navbar.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes, FaSearch, FaUser, FaShoppingCart, FaHeart, FaChevronDown } from 'react-icons/fa';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isWomenDropdownOpen, setIsWomenDropdownOpen] = useState(false);
  const [isMenDropdownOpen, setIsMenDropdownOpen] = useState(false);
  const { state } = useCart();

  const cartItemsCount = state.items.reduce((total, item) => total + item.quantity, 0);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50 px-4 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between h-16">
          {/* Mobile Menu Button */}
          

          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-gray-900 mr-2">Karen's<span className='text-red-600'>Care</span></span>
            {/* <span className="text-lg text-gray-600"></span> */}
          </Link>

          {/* Navigation Links - Desktop */}
          <div className="hidden md:flex items-center space-x-8">
            
            
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-6">
            <Link to="/" className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200">
              Home
            </Link>
            
            <Link to="/profile" className="text-gray-700 hover:text-blue-600 transition-colors duration-200">
              <FaUser size={18} />
            </Link>
            
            <Link to="/cart" className="relative text-gray-700 hover:text-blue-600 transition-colors duration-200">
              <FaShoppingCart size={18} />
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Mobile Menu */}
        
      </div>
    </nav>
  );
};

export default Navbar;