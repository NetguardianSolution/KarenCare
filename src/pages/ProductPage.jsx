// pages/ProductPage.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { FaArrowRight, FaSpinner} from 'react-icons/fa'

import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { dispatch } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const docRef = doc(db, "services", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setProduct({ id: docSnap.id, ...docSnap.data() });
        } else {
          setProduct(null);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
      setLoading(false);
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="w-full flex justify-center items-center h-screen bg-[#FFDAB9]">
        <FaSpinner className="animate-spin text-5xl text-[#4d1515]" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-900">Product not found</h1>
      </div>
    );
  }

  const handleAddToCart = () => {
    dispatch({
      type: 'ADD_TO_CART',
      payload: {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: quantity
      }
    });
    navigate('/cart');
  };

  const increaseQuantity = () => setQuantity(prev => prev + 1);
  const decreaseQuantity = () => setQuantity(prev => prev > 1 ? prev - 1 : 1);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

        {/* Product Image */}
        <div className="shadow-inner bg-red-700 rounded-2xl h-96 flex items-center justify-center text-white text-2xl font-bold">
          <div className='text-center bg-white p-4 m-3 rounded-full'>
            <h1 className="text-4xl font-bold text-[#4d1515] mb-2">{product.name}</h1>
          </div>
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <div>
            <p className="text-xl text-gray-600 mb-4">{product.description}</p>
          </div>

          {/* Price Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <span className="text-4xl font-bold text-gray-900">${product.price}</span>
              {product.originalPrice && (
                <>
                  <span className="text-2xl text-gray-500 line-through">${product.originalPrice}</span>
                  <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-semibold">
                    Save ${product.originalPrice - product.price}
                  </span>
                </>
              )}
            </div>

            <div className="bg-cyan-50 border border-cyan-200 rounded-lg p-4">
              <p className="text-cyan-800 font-semibold">
                Program begins: <span className="font-bold">{new Date(product.startDate).toLocaleDateString()}</span>
              </p>
            </div>
          </div>

          {/* Features */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-900">What's Included:</h3>
            <ul className="space-y-2">
              {product.features.map((feature, index) => (
                <li key={index} className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Quantity */}
          <div className="space-y-3">
            <label className="text-lg font-semibold text-gray-900">Quantity</label>
            <div className="flex items-center space-x-4">
              <div className="flex items-center bg-white border rounded-full">
                <button onClick={decreaseQuantity} className="px-4 py-3 text-gray-600 font-semibold text-2xl">-</button>
                <span className="px-4 py-3 text-lg font-semibold min-w-12 text-center">{quantity}</span>
                <button onClick={increaseQuantity} className="px-4 py-3 text-gray-600 font-semibold text-2xl">+</button>
              </div>
            </div>
          </div>

          {/* Add to Cart */}
          <button
            onClick={handleAddToCart}
            className="w-full bg-[#4d1515] text-white py-4 rounded-xl font-semibold text-lg shadow-lg"
          >
            Add to Cart - ${(product.price * quantity).toFixed(2)}
          </button>

          <p className="text-center text-gray-500 text-sm">
            Secure checkout with cryptocurrency
          </p>
        </div>

      </div>
    </div>
  );
};

export default ProductPage;
