import React from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center animate-slide-up">
        <h1 className="text-5xl font-bold text-primary-900 mb-4">Welcome to Eshop</h1>
        <p className="text-lg text-gray-600 mb-8">Premium Multi-Vendor Platform</p>
        <button onClick={() => navigate('/products')} className="btn-primary">Start Shopping</button>
      </div>
    </div>
  );
};

const Products = () => (
  <div className="min-h-screen p-8 bg-gray-50">
    <h1 className="text-4xl font-bold text-gray-900 mb-6">All Products</h1>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Placeholder for products */}
      <div className="card-premium">Product 1</div>
      <div className="card-premium">Product 2</div>
      <div className="card-premium">Product 3</div>
    </div>
  </div>
);

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
