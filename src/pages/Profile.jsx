// pages/Profile.js
import React, { useState, useEffect } from 'react';
import { FaCheckCircle, FaClock, FaTimesCircle, FaDollarSign, FaChartLine } from 'react-icons/fa';

const Profile = () => {
  const [orders, setOrders] = useState([]);
  const [totalSpent, setTotalSpent] = useState(0);

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    setOrders(savedOrders);
    
    // Calculate total spent
    const spent = savedOrders.reduce((total, order) => total + order.total, 0);
    setTotalSpent(spent);
  }, []);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'confirmed':
        return <FaCheckCircle className="text-green-500" />;
      case 'pending':
        return <FaClock className="text-yellow-500" />;
      default:
        return <FaTimesCircle className="text-red-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-red-100 text-red-800';
    }
  };

  return (
    <div className="max-w-7xl grid lg:grid-cols-6 gap-8 mx-auto px-4 py-8">
      {/* Main Content */}
      <div className='col-span-4'>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Profile</h1>
        <p className="text-gray-600 mb-8">View your coaching program orders and status</p>
        {orders.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">No Orders Yet</h2>
            <p className="text-gray-600 mb-8">
              You haven't purchased any coaching programs yet.
            </p>
            <a
              href="/"
              className="bg-red-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors duration-200"
            >
              Browse Programs
            </a>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map(order => (
              <div key={order.id} className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Order #{order.id.slice(-8)}
                    </h3>
                    <p className="text-gray-600">
                      {new Date(order.date).toLocaleDateString()} at{' '}
                      {new Date(order.date).toLocaleTimeString()}
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor("pending")}`}>
                    {/* {order.status.charAt(0).toUpperCase() + order.status.slice(1)} */}
                    Pending
                  </span>
                </div>
                <div className="border-t border-gray-200 pt-4">
                  {order.items.map(item => (
                    <div key={item.id} className="flex justify-between items-center py-2">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-[#4d1515] rotate-45 rounded-lg flex items-center justify-center text-white text-xs font-bold">
                          <p className='-rotate-45'>{item.name[0]}</p>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{item.name}</p>
                          <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                        </div>
                      </div>
                      <p className="font-semibold text-gray-900">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="border-t border-gray-200 pt-4 flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-600">Paid with {order.cryptoType}</p>
                    <p className="text-xs text-gray-500 font-mono">
                      {order.cryptoAddress.slice(0, 20)}...
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-gray-900">
                      ${order.total.toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Side Panel */}
      <div className='col-span-2 sm:col-span-4 space-y-6 '>
        {/* Total Spending Card */}
        <div className="bg-[#4d1515] rounded-2xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Total Spent</h3>
            <FaDollarSign className="text-white opacity-80" />
          </div>
          <div className="mb-2">
            <p className="text-3xl font-bold">${totalSpent.toFixed(2)}</p>
            <p className="text-blue-100 text-sm mt-1">
              Across {orders.length} order{orders.length !== 1 ? 's' : ''}
            </p>
          </div>
          <div className="flex items-center text-blue-100 text-sm">
            <FaChartLine className="mr-1" />
            <span>Lifetime spending</span>
          </div>
        </div>

        {/* Ad Space */}
        <div className="bg-white rounded-2xl sm:hidden shadow-lg p-6 border-2 border-dashed border-gray-300">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Premium Features</h3>
            <p className="text-gray-600 text-sm mb-4">
              Unlock advanced analytics and personalized insights
            </p>
            <div className="bg-gradient-to-r from-green-400 to-blue-500 rounded-lg p-4 text-white mb-4">
              <p className="font-semibold">Upgrade to Pro</p>
              <p className="text-sm opacity-90">Get detailed spending reports</p>
            </div>
            <button className="w-full bg-gray-900 text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors duration-200">
              Download Now
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        {/* {orders.length > 0 && (
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Completed Orders</span>
                <span className="font-semibold text-green-600">
                  {orders.filter(order => order.status === 'confirmed').length}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Pending Orders</span>
                <span className="font-semibold text-yellow-600">
                  {orders.filter(order => order.status === 'pending').length}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Average Order</span>
                <span className="font-semibold text-gray-900">
                  ${orders.length > 0 ? (totalSpent / orders.length).toFixed(2) : '0.00'}
                </span>
              </div>
            </div>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default Profile;