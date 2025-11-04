// context/CartContext.js
import React, { createContext, useContext, useReducer, useEffect } from 'react';

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'LOAD_CART':
      return {
        ...state,
        items: action.payload || [],
        loading: false
      };
    case 'ADD_TO_CART':
      const existingItem = state.items.find(item => item.id === action.payload.id);
      let newItems;
      
      if (existingItem) {
        newItems = state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + action.payload.quantity }
            : item
        );
      } else {
        newItems = [...state.items, action.payload];
      }
      
      localStorage.setItem('cart', JSON.stringify(newItems));
      return { ...state, items: newItems };
    
    case 'UPDATE_QUANTITY':
      const updatedItems = state.items.map(item =>
        item.id === action.payload.id
          ? { ...item, quantity: action.payload.quantity }
          : item
      ).filter(item => item.quantity > 0);
      
      localStorage.setItem('cart', JSON.stringify(updatedItems));
      return { ...state, items: updatedItems };
    
    case 'REMOVE_FROM_CART':
      const filteredItems = state.items.filter(item => item.id !== action.payload);
      localStorage.setItem('cart', JSON.stringify(filteredItems));
      return { ...state, items: filteredItems };
    
    case 'CLEAR_CART':
      localStorage.setItem('cart', JSON.stringify([]));
      return { ...state, items: [] };
    
    case 'ADD_ORDER':
      // Check if order already exists to prevent duplicates
      const orders = JSON.parse(localStorage.getItem('orders') || '[]');
      const orderExists = orders.find(order => 
        order.id === action.payload.id || 
        (order.date === action.payload.date && order.total === action.payload.total)
      );
      
      if (!orderExists) {
        const newOrder = {
          id: action.payload.id || Date.now().toString(),
          date: action.payload.date || new Date().toISOString(),
          items: action.payload.items,
          total: action.payload.total,
          status: 'confirmed', // Changed from 'pending' to 'confirmed' since we're simulating successful payment
          cryptoAddress: action.payload.cryptoAddress,
          cryptoType: action.payload.cryptoType
        };
        orders.unshift(newOrder);
        localStorage.setItem('orders', JSON.stringify(orders));
      }
      return state;
    
    case 'UPDATE_ORDER_STATUS':
      const allOrders = JSON.parse(localStorage.getItem('orders') || '[]');
      const updatedOrders = allOrders.map(order =>
        order.id === action.payload.orderId
          ? { ...order, status: action.payload.status }
          : order
      );
      localStorage.setItem('orders', JSON.stringify(updatedOrders));
      return state;
    
    default:
      return state;
  }
};

const initialState = {
  items: [],
  loading: true,
  isProcessing: false // Added to track payment state
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    dispatch({ type: 'LOAD_CART', payload: savedCart ? JSON.parse(savedCart) : [] });
  }, []);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};