import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cart: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const isItemExist = state.cart.find((i) => i.productId === item.productId);
      if (isItemExist) {
        state.cart = state.cart.map((i) => (i.productId === isItemExist.productId ? item : i));
      } else {
        state.cart.push(item);
      }
      localStorage.setItem('cartItems', JSON.stringify(state.cart));
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter((i) => i.productId !== action.payload);
      localStorage.setItem('cartItems', JSON.stringify(state.cart));
    },
    clearCart: (state) => {
      state.cart = [];
      localStorage.setItem('cartItems', JSON.stringify(state.cart));
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
