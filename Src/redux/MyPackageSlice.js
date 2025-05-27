import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cart: [],
};

const myPkageSlice = createSlice({
  name: 'myPackage',
  initialState: initialState,
  reducers: {
    addToCart(state, action) {
      const { id } = action.payload;
      const existingItemIndex = state.cart.findIndex(item => item.id === id);
      if (existingItemIndex === -1) {
        state.cart.push({ ...action.payload, quantity: 200 });
      }
    },
    removeFromCart(state, action) {
      const { id } = action.payload;
      state.cart = state.cart.filter(item => item.id !== id);
    },
    removeAllFromCart(state) {
      state.cart = [];
    },
    updateCartQuantity(state, action) {
      const { id, quantity } = action.payload;
      const cartItem = state.cart.find(item => item.id === id);
      if (cartItem) {
        cartItem.quantity = quantity;
      }
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateCartQuantity,
  removeAllFromCart,
} = myPkageSlice.actions;

export default myPkageSlice.reducer;

