import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedin, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-200 py-12 px-6 md:px-16 mt-10">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-8">
        {/* Brand / About */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-3">Karen<span className="text-red-500">Care</span></h2>
          <p className="text-sm leading-relaxed">
            Empowering individuals to heal, grow, and rediscover peace of mind.
            We offer compassionate relationship health counseling and emotional support.
          </p>
        </div>

        {/* Services */}
        {/* <div>
          <h3 className="text-lg font-semibold text-white mb-3">Our Services</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-white">Anxiety Management</a></li>
            <li><a href="#" className="hover:text-white">Depression Recovery</a></li>
            <li><a href="#" className="hover:text-white">Relationship Therapy</a></li>
            <li><a href="#" className="hover:text-white">Infidelity Healing</a></li>
          </ul>
        </div> */}

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/" className="hover:text-white">Home</a></li>
            <li><a href="/profile" className="hover:text-white">Profile</a></li>
            <li><a href="/cart" className="hover:text-white">Cart</a></li>
            {/* <li><a href="#" className="hover:text-white">Contac</a></li> */}
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Stay Connected</h3>
         

          <div className="flex space-x-4 mt-5 text-lg">
            <a href="#" className="hover:text-white"><FaFacebookF /></a>
            <a href="#" className="hover:text-white"><FaTwitter /></a>
            <a href="#" className="hover:text-white"><FaInstagram /></a>
            <a href="#" className="hover:text-white"><FaLinkedin /></a>
          </div>
        </div>
      </div>

      
      <div className="border-t border-gray-700 mt-10 pt-4 text-center text-sm">
        <p>© {new Date().getFullYear()} KarenCare. All Rights Reserved.</p>
        {/* <p className="text-xs text-gray-400 mt-1">Your peace of mind starts here</p> */}
      </div>
    </footer>
  );
};

export default Footer;
