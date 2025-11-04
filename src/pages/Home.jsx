// pages/Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import { products } from '../data/products';
import { FaArrowRight} from 'react-icons/fa'

const Home = () => {
  return (
    <div className='bg-[#FFDAB9]'>
        <div className="max-w-7xl mx-auto  px-4 sm:px-6 lg:px-8 py-8">

          {/* Hero Section */}
          <div className="bg-gradient-to-r from-red-600 to-red-900 rounded-2xl p-8 mb-12 text-white">
            <div className="max-w-2xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Transform Your Relationship with Expert Coaching
              </h1>
              <p className="text-xl mb-6 opacity-90">
                Join our professional coaching programs with personalized guidance.
              </p>
        
            </div>
          </div>
          {/* Featured Products */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Featured Programs</h2>
            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-8">
              {products.map(product => (
                <div key={product.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                    <div className="h-50 bg-white flex items-center justify-center">
                        <div className="w-36 h-36 rotate-45 flex rounded-xl items-center justify-center bg-red-600 relative">
                            <h3 className="text-xl font-bold text-gray-100 -rotate-45 text-center px-4">
                            {product.name}
                            </h3>
                        </div>
                    </div>
                  <div className="p-6">
        
                    <p className="text-gray-600 mb-4 line-clamp-2">{product.description}</p>
        
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl font-bold text-gray-900">${product.price}</span>
                        <span className="text-lg text-gray-500 line-through">${product.originalPrice}</span>
                      </div>
                      <span className="bg-green-100 text-green-800 text-sm font-medium px-2 py-1 rounded">
                        Starts {new Date(product.startDate).toLocaleDateString()}
                      </span>
                    </div>
                    <Link
                      to={`/product/${product.id}`}
                      className="w-full bg-[#4d1515] flex items-center justify-center text-white py-3 rounded-lg font-semibold hover:bg-[#000000] transition-colors duration-200 text-center"
                    >
                      <div className='flex items-center'>
                          View Program
                          <FaArrowRight className='m-2' />
                      </div>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
    </div>
  );
};

export default Home;