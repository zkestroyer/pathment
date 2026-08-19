import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import API from '../api/axios';
import { clearCart } from '../redux/cartSlice';

const Checkout = () => {
  const { cart } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [shipping, setShipping] = useState({
    address1: '',
    address2: '',
    city: '',
    country: 'US',
    zipCode: '',
  });

  const subtotal = cart.reduce((acc, item) => acc + item.price * (item.qty || item.quantity || 1), 0);
  const shipping_cost = subtotal > 100 ? 0 : 10;
  const total = subtotal + shipping_cost;

  const handleShippingChange = (e) => {
    setShipping({ ...shipping, [e.target.name]: e.target.value });
  };

  const handleCheckout = async (e) => {
    e.preventDefault();
    if (!user) {
      alert('Please login first to place an order.');
      navigate('/login');
      return;
    }
    setLoading(true);
    try {
      // 1. Process Payment via Stripe
      const paymentData = { amount: Math.round(total * 100) };
      const { data: paymentRes } = await API.post('/payment/process', paymentData);

      if (paymentRes.success) {
        // 2. Create Order — map cart items to match backend Order schema
        const orderCart = cart.map((item) => ({
          productId: item.productId,
          quantity: item.qty || item.quantity || 1,
          price: item.price,
          shopId: item.shopId || undefined,
        }));

        const orderData = {
          cart: orderCart,
          shippingAddress: {
            address1: shipping.address1,
            address2: shipping.address2 || '',
            city: shipping.city,
            country: shipping.country,
            zipCode: shipping.zipCode,
          },
          totalPrice: total,
          paymentInfo: {
            id: paymentRes.client_secret,
            status: "Succeeded",
            type: "Stripe",
          },
        };

        await API.post('/order/create-order', orderData);
        dispatch(clearCart());
        alert('✅ Payment successful! Your order has been placed.');
        navigate('/my-orders');
      }
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || 'Error processing payment or placing order.');
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="text-center py-20 animate-fade-in">
        <p className="text-lg text-gray-500">Your cart is empty.</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 animate-fade-in">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      <form onSubmit={handleCheckout}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Shipping Address */}
          <div className="card-premium p-6">
            <h2 className="text-xl font-bold mb-4">Shipping Address</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Address Line 1 *</label>
                <input name="address1" type="text" required className="w-full border border-gray-300 rounded-lg p-2.5 focus:outline-none focus:ring-accent focus:border-accent" value={shipping.address1} onChange={handleShippingChange} placeholder="123 Main St" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Address Line 2</label>
                <input name="address2" type="text" className="w-full border border-gray-300 rounded-lg p-2.5 focus:outline-none focus:ring-accent focus:border-accent" value={shipping.address2} onChange={handleShippingChange} placeholder="Apt 4B (optional)" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">City *</label>
                  <input name="city" type="text" required className="w-full border border-gray-300 rounded-lg p-2.5 focus:outline-none focus:ring-accent focus:border-accent" value={shipping.city} onChange={handleShippingChange} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Zip Code *</label>
                  <input name="zipCode" type="text" required className="w-full border border-gray-300 rounded-lg p-2.5 focus:outline-none focus:ring-accent focus:border-accent" value={shipping.zipCode} onChange={handleShippingChange} />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Country *</label>
                <select name="country" required className="w-full border border-gray-300 rounded-lg p-2.5 bg-white focus:outline-none focus:ring-accent focus:border-accent" value={shipping.country} onChange={handleShippingChange}>
                  <option value="US">United States</option>
                  <option value="GB">United Kingdom</option>
                  <option value="CA">Canada</option>
                  <option value="AU">Australia</option>
                  <option value="IN">India</option>
                  <option value="PK">Pakistan</option>
                </select>
              </div>
            </div>
          </div>

          {/* Order Summary & Payment */}
          <div className="space-y-6">
            <div className="card-premium p-6">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>
              <div className="space-y-3">
                {cart.map((item) => (
                  <div key={item.productId} className="flex justify-between text-sm">
                    <span className="text-gray-700">{item.name} × {item.qty || item.quantity || 1}</span>
                    <span className="font-medium">${(item.price * (item.qty || item.quantity || 1)).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <hr className="my-4" />
              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm mt-1">
                <span>Shipping</span>
                <span>{shipping_cost === 0 ? 'FREE' : `$${shipping_cost.toFixed(2)}`}</span>
              </div>
              <hr className="my-4" />
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span className="text-accent">${total.toFixed(2)}</span>
              </div>
            </div>

            <div className="card-premium p-6">
              <h2 className="text-xl font-bold mb-4">Payment</h2>
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-600">💳 Stripe Secure Payment</span>
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">Secure</span>
                </div>
                <p className="text-xs text-gray-500">Payment is processed securely via Stripe. Your card details are never stored on our servers.</p>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                <input type="text" className="w-full border border-gray-300 rounded-lg p-2.5 bg-gray-50" value="4242 4242 4242 4242" readOnly />
                <p className="text-xs text-gray-400 mt-1">Test mode — Stripe test card is pre-filled</p>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Expiry</label>
                  <input type="text" className="w-full border border-gray-300 rounded-lg p-2.5 bg-gray-50" value="12/28" readOnly />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">CVC</label>
                  <input type="text" className="w-full border border-gray-300 rounded-lg p-2.5 bg-gray-50" value="123" readOnly />
                </div>
              </div>
              <button type="submit" disabled={loading} className="w-full btn-primary py-3 text-lg font-semibold">
                {loading ? 'Processing Payment...' : `Pay $${total.toFixed(2)}`}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Checkout;
