import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';
import { clearCart } from '../redux/cartSlice';

const Checkout = () => {
  const { cart } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleCheckout = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // 1. Process Payment
      const paymentData = { amount: Math.round(subtotal * 100) };
      const { data: paymentRes } = await API.post('/payment/process', paymentData);

      if (paymentRes.success) {
        // 2. Create Order
        const orderData = {
          cart,
          shippingAddress: {
            address: "123 Test St",
            city: "Testville",
            country: "US",
            zipCode: "12345"
          },
          user,
          totalPrice: subtotal,
          paymentInfo: {
            id: paymentRes.client_secret || "pi_test_123",
            status: "succeeded",
            type: "Credit Card"
          }
        };

        await API.post('/order/create-order', orderData);
        dispatch(clearCart());
        alert("Payment successful! Order placed.");
        navigate('/');
      }
    } catch (error) {
      console.error(error);
      alert("Error processing payment or placing order.");
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return <div className="text-center py-20">Your cart is empty.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 animate-fade-in">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="card-premium p-6">
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>
          {cart.map((item) => (
            <div key={item.id} className="flex justify-between mb-2">
              <span>{item.name} x {item.quantity}</span>
              <span>${item.price * item.quantity}</span>
            </div>
          ))}
          <hr className="my-4" />
          <div className="flex justify-between font-bold text-lg">
            <span>Total:</span>
            <span>${subtotal}</span>
          </div>
        </div>
        <div className="card-premium p-6">
          <h2 className="text-xl font-bold mb-4">Payment Info</h2>
          <form onSubmit={handleCheckout}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Dummy Card Number</label>
              <input type="text" className="w-full border rounded p-2" value="**** **** **** 4242" readOnly />
            </div>
            <button 
              type="submit" 
              className="btn-primary w-full"
              disabled={loading}
            >
              {loading ? "Processing..." : `Pay $${subtotal}`}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
