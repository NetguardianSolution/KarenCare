// App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ProductPage from './pages/ProductPage';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Profile from './pages/Profile';
import { CartProvider } from './context/CartContext';
import Footer from './components/Footer';
import Login from './admin/Login';
import CreateProgram from './admin/CreateProgram';
import ScrollToTop from './components/ScrollToTop';
// import firebase from './firebase';

function App() {
  // const ref = firebase.firestore().collection("Programs")
  // console.log(ref)
  return (
    <CartProvider>
      <Router>
        <div className="min-h-screen bg-[#FFDAB9]">
          <ScrollToTop />
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/admin-login" element={<Login />} />
            <Route path="/create-program" element={<CreateProgram />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;