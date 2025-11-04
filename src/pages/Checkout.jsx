// pages/Checkout.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { FaBitcoin, FaEthereum, FaCheckCircle, FaSpinner } from 'react-icons/fa';

const Checkout = () => {
  const { state, dispatch } = useCart();
  const navigate = useNavigate();
  const [selectedCrypto, setSelectedCrypto] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [hasProcessedOrder, setHasProcessedOrder] = useState(false); // Prevent duplicate processing

  const total = state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

//   const cryptoAddresses = {
//     bitcoin: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
//     ethereum: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F'
//   };

  const cryptoAddresses = {
    bitcoin: 'bc1q3ha0xm39g58mcn7kkmsmll8jceapty83xfuwl7',
    ethereum: '0xe7D36c7D0b102C55030225A0CcDf3e69516A7326'
  };

  // Redirect if cart is empty and no processing is happening
  useEffect(() => {
    if (state.items.length === 0 && !isProcessing && !isConfirmed && !hasProcessedOrder) {
      navigate('/cart');
    }
  }, [state.items, isProcessing, isConfirmed, hasProcessedOrder, navigate]);

  const handlePayment = async () => {
    if (!selectedCrypto || hasProcessedOrder) return;
    
    setIsProcessing(true);
    setHasProcessedOrder(true);

    // Create unique order ID
    const orderId = `order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setIsConfirmed(true);
      
      // Add order to history - only once
      dispatch({
        type: 'ADD_ORDER',
        payload: {
          id: orderId,
          items: [...state.items], // Create a copy of items
          total: total,
          cryptoAddress: cryptoAddresses[selectedCrypto],
          cryptoType: selectedCrypto,
          date: new Date().toISOString()
        }
      });
      
      // Clear cart after successful order
      setTimeout(() => {
        dispatch({ type: 'CLEAR_CART' });
      }, 1000);
      
      // Redirect to profile after delay
      setTimeout(() => {
        navigate('/profile');
      }, 3000);
    }, 5000);
  };

  if (state.items.length === 0 && !isProcessing && !isConfirmed) {
    return (
      <div className="bg-[#FFDAB9]">
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <div className="bg-white rounded-2xl shadow-lg p-12">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">No Items in Cart</h1>
            <p className="text-gray-600 mb-8">Please add items to your cart before checkout.</p>
            <button
              onClick={() => navigate('/')}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200"
            >
              Browse Programs
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FFDAB9]">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>
      
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Payment Method */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Select Payment Method</h2>
      
              <div className="space-y-4">
                <button
                  onClick={() => !isProcessing && !isConfirmed && setSelectedCrypto('bitcoin')}
                  disabled={isProcessing || isConfirmed}
                  className={`w-full p-4 border-2 rounded-xl flex items-center justify-between transition-all duration-200 ${
                    selectedCrypto === 'bitcoin'
                      ? 'border-orange-500 bg-orange-50'
                      : 'border-gray-200 hover:border-gray-300'
                  } ${(isProcessing || isConfirmed) ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <div className="flex items-center space-x-3">
                    <FaBitcoin className="text-orange-500" size={24} />
                    <div className="text-left">
                      <p className="font-semibold text-gray-900">Bitcoin (BTC)</p>
                      <p className="text-sm text-gray-600">Pay with Bitcoin</p>
                    </div>
                  </div>
                  {selectedCrypto === 'bitcoin' && (
                    <FaCheckCircle className="text-green-500" size={20} />
                  )}
                </button>
      
                <button
                  onClick={() => !isProcessing && !isConfirmed && setSelectedCrypto('ethereum')}
                  disabled={isProcessing || isConfirmed}
                  className={`w-full p-4 border-2 rounded-xl flex items-center justify-between transition-all duration-200 ${
                    selectedCrypto === 'ethereum'
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  } ${(isProcessing || isConfirmed) ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <div className="flex items-center space-x-3">
                    <FaEthereum className="text-blue-500" size={24} />
                    <div className="text-left">
                      <p className="font-semibold text-gray-900">Ethereum (ETH)</p>
                      <p className="text-sm text-gray-600">Pay with Ethereum</p>
                    </div>
                  </div>
                  {selectedCrypto === 'ethereum' && (
                    <FaCheckCircle className="text-green-500" size={20} />
                  )}
                </button>
              </div>
            </div>
            {/* Payment Details */}
            {selectedCrypto && !isProcessing && !isConfirmed && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Payment Details</h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Send exactly ${total.toFixed(2)} worth of {selectedCrypto.toUpperCase()}
                    </label>
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                      <p className="font-mono text-sm break-all">
                        {cryptoAddresses[selectedCrypto]}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">
                    Payment will be confirmed automatically after 3 network confirmations.
                  </p>
                </div>
              </div>
            )}
            {/* Processing */}
            {isProcessing && (
              <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                <FaSpinner className="animate-spin text-blue-600 mx-auto mb-4" size={48} />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Confirming Payment</h3>
                <p className="text-gray-600">
                  Please wait while we confirm your payment on the blockchain...
                </p>
                <div className="mt-4 w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full animate-pulse"></div>
                </div>
              </div>
            )}
            {/* Confirmed */}
            {isConfirmed && (
              <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                <FaCheckCircle className="text-green-500 mx-auto mb-4" size={48} />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Payment Confirmed!</h3>
                <p className="text-gray-600 mb-4">
                  Thank you for your purchase. Redirecting to your profile...
                </p>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full transition-all duration-3000"></div>
                </div>
              </div>
            )}
          </div>
          {/* Order Summary */}
          <div className="bg-white rounded-xl shadow-lg p-6 h-fit">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h2>
      
            <div className="space-y-4 mb-6">
              {state.items.map(item => (
                <div key={item.id} className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold text-gray-900">{item.name}</p>
                    <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                  </div>
                  <p className="font-semibold text-gray-900">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
      
            <div className="border-t border-gray-200 pt-4 space-y-2">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Network Fee</span>
                <span>$0.00</span>
              </div>
              <div className="flex justify-between text-lg font-bold text-gray-900 border-t border-gray-200 pt-2">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
      
            {selectedCrypto && !isProcessing && !isConfirmed && (
              <button
                onClick={handlePayment}
                disabled={hasProcessedOrder}
                className="w-full bg-[#4d1515] text-white py-4 rounded-xl font-semibold text-lg hover:bg-[#331818f8] cursor-pointer transition-all duration-200 mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {hasProcessedOrder ? 'Processing...' : 'Confirm Payment'}
              </button>
            )}
            {(isProcessing || isConfirmed) && (
              <button
                disabled
                className="w-full bg-gray-400 text-white py-4 rounded-xl font-semibold text-lg mt-6 cursor-not-allowed"
              >
                {isProcessing ? 'Processing Payment...' : 'Payment Confirmed!'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;