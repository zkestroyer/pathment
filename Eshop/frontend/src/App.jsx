import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const Home = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="text-center animate-slide-up">
      <h1 className="text-5xl font-bold text-primary-900 mb-4">Welcome to Eshop</h1>
      <p className="text-lg text-gray-600 mb-8">Premium Multi-Vendor Platform</p>
      <button className="btn-primary">Start Shopping</button>
    </div>
  </div>
);

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
