import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import API from '../api/axios';

const CreateProduct = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    tags: '',
    originalPrice: '',
    discountPrice: '',
    stock: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      const payload = {
        name: formData.name,
        description: formData.description,
        category: formData.category,
        tags: formData.tags,
        originalPrice: Number(formData.originalPrice),
        discountPrice: formData.discountPrice ? Number(formData.discountPrice) : Number(formData.originalPrice),
        stock: Number(formData.stock),
      };
      const { data } = await API.post('/product/create-product', payload);
      if (data.success) {
        setSuccess('Product created successfully!');
        setTimeout(() => navigate('/shop-dashboard'), 1500);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center py-12 px-4 animate-fade-in bg-gray-50">
      <div className="max-w-lg w-full space-y-8 bg-white p-10 rounded-2xl shadow-glass">
        <div>
          <h2 className="text-center text-3xl font-extrabold text-gray-900">Create New Product</h2>
          <p className="mt-2 text-center text-sm text-gray-600">List a product in your shop for buyers to purchase.</p>
        </div>
        <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
          {error && <div className="p-3 bg-red-50 text-red-500 rounded-lg text-sm text-center">{error}</div>}
          {success && <div className="p-3 bg-green-50 text-green-600 rounded-lg text-sm text-center">{success}</div>}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Product Name *</label>
            <input name="name" type="text" required className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-accent focus:border-accent sm:text-sm" value={formData.name} onChange={handleChange} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
            <textarea name="description" required rows="3" className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-accent focus:border-accent sm:text-sm" value={formData.description} onChange={handleChange} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
            <select name="category" required className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-accent focus:border-accent sm:text-sm bg-white" value={formData.category} onChange={handleChange}>
              <option value="">Select a category</option>
              <option value="Computers & Laptop">Computers & Laptop</option>
              <option value="Cosmetics & Body Care">Cosmetics & Body Care</option>
              <option value="Accesories">Accesories</option>
              <option value="Clothes">Clothes</option>
              <option value="Shoes">Shoes</option>
              <option value="Gifts">Gifts</option>
              <option value="Pet Care">Pet Care</option>
              <option value="Mobile & Tablets">Mobile & Tablets</option>
              <option value="Music & Gaming">Music & Gaming</option>
              <option value="Others">Others</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
            <input name="tags" type="text" placeholder="e.g. electronics, gaming" className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-accent focus:border-accent sm:text-sm" value={formData.tags} onChange={handleChange} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Original Price ($) *</label>
              <input name="originalPrice" type="number" required min="0" className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-accent focus:border-accent sm:text-sm" value={formData.originalPrice} onChange={handleChange} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Discount Price ($)</label>
              <input name="discountPrice" type="number" min="0" className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-accent focus:border-accent sm:text-sm" value={formData.discountPrice} onChange={handleChange} />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Stock *</label>
            <input name="stock" type="number" required min="0" className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-accent focus:border-accent sm:text-sm" value={formData.stock} onChange={handleChange} />
          </div>
          <button type="submit" disabled={loading} className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-accent hover:bg-primary-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent transition-colors disabled:opacity-70">
            {loading ? 'Creating...' : 'Create Product'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateProduct;
