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
          // Fetch products
          const { data: prodData } = await API.get(`/product/get-all-products-shop/${me.shop._id}`);
          setProducts(prodData.products || []);
          
          // Fetch orders
          const { data: orderData } = await API.get(`/order/get-seller-orders/${me.shop._id}`);
          setOrders(orderData.orders || []);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      const { data } = await API.put(`/order/update-order-status/${orderId}`, { status: newStatus });
      if (data.success) {
        // Update local state
        setOrders(orders.map(o => o._id === orderId ? { ...o, status: newStatus } : o));
      }
    } catch (error) {
      alert(error.response?.data?.message || 'Error updating status');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Seller Dashboard</h1>
        <a href="/create-product" className="btn-primary px-4 py-2 text-sm">+ Add New Product</a>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="card-premium p-6">
          <h2 className="text-xl font-bold mb-4">Your Products</h2>
          {loading ? <p>Loading...</p> : products.length === 0 ? <p>No products yet.</p> : (
            <ul>
              {products.map(p => (
                <li key={p._id} className="mb-2 border-b pb-2 flex justify-between">
                  <span className="font-semibold">{p.name}</span>
                  <span className="text-gray-600">${p.originalPrice}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="card-premium p-6">
          <h2 className="text-xl font-bold mb-4">Store Orders</h2>
          {loading ? <p>Loading orders...</p> : orders.length === 0 ? <p>No orders yet.</p> : (
            <div className="space-y-4">
              {orders.map(order => (
                <div key={order._id} className="border p-4 rounded-lg bg-gray-50">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-mono text-gray-500">Order #{order._id.substring(0, 8)}</span>
                    <span className="font-bold text-accent">${order.totalPrice}</span>
                  </div>
                  <div className="mb-3">
                    <p className="text-sm"><strong>Status:</strong> {order.status}</p>
                    <p className="text-sm"><strong>Items:</strong> {order.cart.reduce((acc, item) => acc + item.quantity, 0)}</p>
                  </div>
                  
                  {order.status !== 'Delivered' && (
                    <div className="flex gap-2">
                      <select 
                        className="border rounded p-1 text-sm bg-white flex-grow"
                        onChange={(e) => handleStatusUpdate(order._id, e.target.value)}
                        defaultValue={order.status}
                      >
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                      </select>
                    </div>
                  )}
                  {order.status === 'Delivered' && (
                    <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded">Completed</span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShopDashboard;
