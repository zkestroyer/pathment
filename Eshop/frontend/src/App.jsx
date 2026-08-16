import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router';
import { useDispatch } from 'react-redux';
import API from './api/axios';
import { LoadUserRequest, LoadUserSuccess, LoadUserFail } from './redux/userSlice';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Login from './pages/Login';
import Register from './pages/Register';
import Cart from './pages/Cart';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const loadUser = async () => {
      try {
        dispatch(LoadUserRequest());
        const { data } = await API.get('/user/getuser');
        dispatch(LoadUserSuccess(data.user));
      } catch (error) {
        dispatch(LoadUserFail(error.response?.data?.message || 'Error loading user'));
      }
    };
    loadUser();
  }, [dispatch]);

  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
