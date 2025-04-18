// import {createSlice} from '@reduxjs/toolkit';

// const initialState = {
//   cart: [],
// };
// const myPkageSlice = createSlice({
//   name: 'myPackage',
//   initialState: initialState,
//   userDetail:[],

//   reducers: {
//     userDetail(state, action) {
//       state.cart.push(action.payload)},



//     addToCart(state, action) {
//       const {id} = action.payload;
//       const existingItemIndex = state.cart.findIndex(item => item.id === id);
//       if (existingItemIndex !== -1) {
//       } else {
//         // Otherwise, add it to car
//         state.cart.push({...action.payload, quantity: 200});
//       }
//     },
//     removeFromCart(state, action) {
//       const {id} = action.payload;
//       state.cart = state.cart.filter(item => item.id !== id);
//     },
//     removeAllFromCart(state) {
//       // Immutable update using spread operator
//       state.cart = []; // Set cart to an empty array to remove all items
//     },
//     updateCartQuantity(state, action) {
//       const {id, quantity} = action.payload;
//       const cartItem = state.cart.find(item => item.id === id);
//       if (cartItem) {
//         cartItem.quantity = quantity;
//       }
//     },
//   },
// });
// export const {addToCart, removeFromCart, updateCartQuantity,userDetail,removeAllFromCart} =
//   myPkageSlice.actions;
// export default myPkageSlice.reducer;
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

