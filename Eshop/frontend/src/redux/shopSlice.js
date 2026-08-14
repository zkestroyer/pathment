import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isSeller: false,
  isLoading: false,
  seller: null,
  error: null,
};

export const shopSlice = createSlice({
  name: 'shop',
  initialState,
  reducers: {
    LoadSellerRequest: (state) => {
      state.isLoading = true;
    },
    LoadSellerSuccess: (state, action) => {
      state.isSeller = true;
      state.isLoading = false;
      state.seller = action.payload;
    },
    LoadSellerFail: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.isSeller = false;
    },
    clearErrors: (state) => {
      state.error = null;
    }
  },
});

export const { LoadSellerRequest, LoadSellerSuccess, LoadSellerFail, clearErrors } = shopSlice.actions;
export default shopSlice.reducer;
