import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API from '../api/axios';
import { useDispatch } from 'react-redux';
import { LoadSellerSuccess } from '../redux/shopSlice';

const ShopLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post('/shop/login', { email, password });
      if (data.success) {
        dispatch(LoadSellerSuccess(data.shop));
        navigate('/shop-dashboard');
      }
    } catch (error) {
      alert(error.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 card-premium">
      <h2 className="text-2xl font-bold mb-6 text-center">Seller Login</h2>
      <form onSubmit={handleLogin}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Email</label>
          <input 
            type="email" 
            required 
            className="w-full border p-2 rounded" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Password</label>
          <input 
            type="password" 
            required 
            className="w-full border p-2 rounded" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />
        </div>
        <button type="submit" className="w-full btn-primary py-2">Login as Seller</button>
        <p className="mt-4 text-center">
          Test Account: store@eshop.com / password123
        </p>
      </form>
    </div>
  );
};

export default ShopLogin;
