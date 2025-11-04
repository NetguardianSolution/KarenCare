// pages/Cart.js
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { FaTrash, FaPlus, FaMinus } from "react-icons/fa";

const Cart = () => {
  const { state, dispatch } = useCart();
  const navigate = useNavigate();

  const updateQuantity = (id, quantity) => {
    if (quantity === 0) {
      dispatch({ type: "REMOVE_FROM_CART", payload: id });
    } else {
      dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } });
    }
  };

  const removeItem = (id) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: id });
  };

  const total = state.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (state.items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <div className="bg-white rounded-2xl shadow-lg p-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Your Cart is Empty
          </h1>
          <p className="text-gray-600 mb-8">
            Start exploring our healing and relationship programs.
          </p>
          <Link
            to="/"
            className="bg-gradient-to-r from-red-600 to-red-700 text-white px-8 py-3 rounded-lg font-semibold hover:from-red-700 hover:to-red-800 transition-all duration-500"
          >
            Browse Programs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FFDAB9]">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-10 tracking-tight">
          Your Cart
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {state.items.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-between p-6"
              >
                {/* Left section with image */}
                <div className="flex items-center space-x-5">
                  <div
                    src={item.image || "/api/placeholder/120/120"}
                    alt={item.name}
                    className="w-20 h-20 flex items-center justify-center text-white text-3xl font-bold bg-red-500 relative rotate-45 object-cover rounded-xl shadow-sm"
                  >
                      <p className="-rotate-45">{item.name[0]}</p>
      
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900">
                      {item.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-1">
                      ${item.price} per session
                    </p>
                    {/* <p className="text-xs text-gray-500 italic">
                      Category: {item.category}
                    </p> */}
                  </div>
                </div>
                {/* Quantity + Price + Delete */}
                <div className="flex items-center space-x-6">
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-2 text-gray-600 hover:text-gray-800 transition"
                    >
                      <FaMinus size={12} />
                    </button>
                    <span className="px-4 py-2 font-semibold min-w-12 text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-2 text-gray-600 hover:text-gray-800 transition"
                    >
                      <FaPlus size={12} />
                    </button>
                  </div>
                  <div className="text-right min-w-20">
                    <p className="font-bold text-gray-900 text-lg">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="p-2 text-red-500 hover:text-red-700 transition"
                    title="Remove item"
                  >
                    <FaTrash size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
          {/* Order Summary */}
          <div className="bg-white rounded-2xl shadow-lg p-8 sticky top-10 h-fit">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Order Summary
            </h2>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span className="text-green-600">Free</span>
              </div>
              <div className="border-t border-gray-200 pt-3">
                <div className="flex justify-between text-lg font-bold text-gray-900">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => navigate("/checkout")}
              className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-4 rounded-xl font-semibold text-lg cursor-pointer hover:from-red-700 hover:to-red-800 transition-all duration-200 transform hover:scale-[1.03]"
            >
              Proceed to Checkout
            </button>
            <p className="text-center text-gray-500 text-sm mt-4">
              Secure & confidential payment
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
