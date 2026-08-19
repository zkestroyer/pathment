import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import API from '../api/axios';
import Loader from '../components/Loader';

const MyOrders = () => {
  const { user } = useSelector((state) => state.user);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user?._id) return;
      try {
        const { data } = await API.get(`/order/get-all-orders/${user._id}`);
        setOrders(data.orders || []);
      } catch (error) {
        console.error('Error fetching orders', error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [user]);

  if (loading) return <Loader />;

  const getStatusColor = (status) => {
    switch (status) {
      case 'Processing': return 'bg-yellow-100 text-yellow-800';
      case 'Shipped': return 'bg-blue-100 text-blue-800';
      case 'Delivered': return 'bg-green-100 text-green-800';
      case 'Cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 animate-fade-in">
      <h1 className="text-3xl font-bold mb-8">My Orders</h1>
      {orders.length === 0 ? (
        <div className="text-center py-20 text-gray-500">
          <p className="text-lg">You haven't placed any orders yet.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order._id} className="card-premium p-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
                <div>
                  <p className="text-sm text-gray-500 font-mono">Order #{order._id.substring(0, 10)}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    Placed on {new Date(order.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>
                </div>
                <span className={`mt-2 sm:mt-0 inline-block px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}>
                  {order.status}
                </span>
              </div>

              <div className="border-t pt-4">
                {order.cart.map((item, idx) => (
                  <div key={idx} className="flex justify-between py-2 border-b border-gray-100 last:border-0">
                    <div>
                      <p className="font-medium text-gray-800">Product</p>
                      <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-semibold text-gray-900">${item.price}</p>
                  </div>
                ))}
              </div>

              <div className="flex justify-between mt-4 pt-4 border-t">
                <span className="font-bold text-lg">Total</span>
                <span className="font-bold text-lg text-accent">${order.totalPrice}</span>
              </div>

              {order.status === 'Delivered' && order.deliveredAt && (
                <p className="text-sm text-green-600 mt-2">
                  ✅ Delivered on {new Date(order.deliveredAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
              )}

              <div className="mt-4 pt-4 border-t">
                <p className="text-sm text-gray-500">
                  <strong>Payment:</strong> {order.paymentInfo?.type} — {order.paymentInfo?.status}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrders;
