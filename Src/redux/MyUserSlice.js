import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  user:null,
};
const myUserSlice = createSlice({
  name: 'user',
  initialState: initialState,
  // userdetail:[],

  reducers: {
    userLogin(state, action) {
      state.user = action.payload; // Set user to the new value instead of pushing to an array
    },
  },
});
export const {userLogin} =myUserSlice.actions;
export default myUserSlice.reducer;
