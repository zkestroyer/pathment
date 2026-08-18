import React, { useEffect, useState } from 'react';
import API from '../api/axios';

const ShopDashboard = () => {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: me } = await API.get('/shop/me');
        if (me.shop) {
          const { data: prodData } = await API.get(`/product/get-all-products-shop/${me.shop._id}`);
          setProducts(prodData.products || []);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8">Seller Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="card-premium p-6">
          <h2 className="text-xl font-bold mb-4">Your Products</h2>
          {loading ? <p>Loading...</p> : products.length === 0 ? <p>No products yet.</p> : (
            <ul>
              {products.map(p => (
                <li key={p._id} className="mb-2 border-b pb-2">
                  <span className="font-semibold">{p.name}</span> - ${p.originalPrice}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="card-premium p-6">
          <h2 className="text-xl font-bold mb-4">Store Orders</h2>
          <p>Order lifecycle fulfillment happens here.</p>
          {/* List orders from shop API */}
        </div>
      </div>
    </div>
  );
};

export default ShopDashboard;
