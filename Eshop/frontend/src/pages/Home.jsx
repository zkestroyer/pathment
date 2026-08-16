import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import API from '../api/axios';
import ProductCard from '../components/ProductCard';
import Loader from '../components/Loader';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await API.get('/product/get-all-products');
        // Take only first 4 products for featured section
        if (data.products) {
          setProducts(data.products.slice(0, 4));
        } else {
          setProducts([]);
        }
      } catch (error) {
        console.error('Error fetching products', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="bg-primary-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 tracking-tight animate-slide-up">
            Discover Your Next <span className="text-accent">Favorite Thing</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            Shop from thousands of independent vendors offering unique products you won't find anywhere else.
          </p>
          <Link to="/products" className="btn-primary text-lg px-8 py-3 inline-block">
            Shop Now
          </Link>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Featured Products</h2>
            <p className="text-gray-500 mt-2">Handpicked collections just for you</p>
          </div>
          <Link to="/products" className="text-accent font-medium hover:underline hidden sm:block">
            View All
          </Link>
        </div>

        {loading ? (
          <Loader />
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard
                key={product._id}
                id={product._id}
                name={product.name}
                price={product.discountPrice || product.originalPrice}
                description={product.description}
                images={product.images}
                ratings={product.ratings}
                shopName={product.shop?.name}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-10 bg-gray-50 rounded-2xl">
            <p className="text-gray-500">No products found at the moment.</p>
          </div>
        )}
        
        <div className="mt-8 text-center sm:hidden">
          <Link to="/products" className="text-accent font-medium hover:underline">
            View All Products
          </Link>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Why Choose Us</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card-premium p-6 text-center">
              <div className="w-16 h-16 mx-auto bg-primary-100 text-primary-500 rounded-full flex items-center justify-center text-2xl mb-4">
                🚚
              </div>
              <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
              <p className="text-gray-600">Get your orders delivered right to your doorstep within days.</p>
            </div>
            
            <div className="card-premium p-6 text-center">
              <div className="w-16 h-16 mx-auto bg-primary-100 text-primary-500 rounded-full flex items-center justify-center text-2xl mb-4">
                🔒
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure Payments</h3>
              <p className="text-gray-600">Your transactions are protected with industry-leading encryption.</p>
            </div>
            
            <div className="card-premium p-6 text-center">
              <div className="w-16 h-16 mx-auto bg-primary-100 text-primary-500 rounded-full flex items-center justify-center text-2xl mb-4">
                ⭐
              </div>
              <h3 className="text-xl font-semibold mb-2">Quality Products</h3>
              <p className="text-gray-600">We carefully vet all our vendors to ensure top-notch quality.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
