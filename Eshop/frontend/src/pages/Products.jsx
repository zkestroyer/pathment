import React, { useEffect, useState } from 'react';
import API from '../api/axios';
import ProductCard from '../components/ProductCard';
import Loader from '../components/Loader';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await API.get('/product/get-all-products');
        if (data.products) {
          setProducts(data.products);
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">All Products</h1>
        <p className="text-gray-500 mt-2">Browse our complete collection</p>
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
        <div className="text-center py-20 bg-gray-50 rounded-2xl">
          <div className="text-4xl mb-4">🛒</div>
          <h2 className="text-xl font-medium text-gray-900 mb-2">No products found</h2>
          <p className="text-gray-500">Check back later for new arrivals.</p>
        </div>
      )}
    </div>
  );
};

export default Products;
