import React from 'react';
import { Link } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart, removeFromCart } from '../redux/cartSlice';
import { FiTrash2, FiMinus, FiPlus } from 'react-icons/fi';

const Cart = () => {
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const increaseQuantity = (item) => {
    if (item.stock > item.qty) {
      dispatch(addToCart({ ...item, qty: item.qty + 1 }));
    }
  };

  const decreaseQuantity = (item) => {
    if (item.qty > 1) {
      dispatch(addToCart({ ...item, qty: item.qty - 1 }));
    }
  };

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.qty, 0);
  const shipping = 10; // Flat rate for example
  const total = subtotal > 0 ? subtotal + shipping : 0;

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center animate-fade-in">
        <div className="text-6xl mb-6">🛒</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
        <p className="text-gray-500 mb-8">Looks like you haven't added anything to your cart yet.</p>
        <Link to="/products" className="btn-primary px-8 py-3">Start Shopping</Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-in">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cart.map((item) => (
            <div key={item.productId} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col sm:flex-row items-center gap-4">
              <div className="w-24 h-24 bg-gray-100 rounded-lg flex-shrink-0 overflow-hidden">
                {item.image ? (
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">No Image</div>
                )}
              </div>
              
              <div className="flex-1 text-center sm:text-left">
                <Link to={`/product/${item.productId}`} className="font-semibold text-lg hover:text-accent transition-colors line-clamp-1">{item.name}</Link>
                <div className="text-sm text-gray-500">{item.shopName}</div>
                <div className="font-bold mt-1">${item.price}</div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button onClick={() => decreaseQuantity(item)} className="p-2 hover:bg-gray-50 text-gray-600 transition-colors rounded-l-lg">
                    <FiMinus className="w-4 h-4" />
                  </button>
                  <span className="w-8 text-center text-sm font-medium">{item.qty}</span>
                  <button onClick={() => increaseQuantity(item)} className="p-2 hover:bg-gray-50 text-gray-600 transition-colors rounded-r-lg">
                    <FiPlus className="w-4 h-4" />
                  </button>
                </div>
                <button 
                  onClick={() => handleRemove(item.productId)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  title="Remove item"
                >
                  <FiTrash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-2xl shadow-glass sticky top-24">
            <h2 className="text-xl font-bold mb-6 border-b pb-4">Order Summary</h2>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span>${shipping.toFixed(2)}</span>
              </div>
            </div>
            
            <div className="border-t pt-4 mb-6">
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
            
            <button className="w-full btn-primary py-3 flex justify-center items-center">
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
