import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: null,
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      // console.log("Saving token:---------->", action.payload.user); 
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    logout: (state) => {
      // console.log("token remove:", state); 
      state.token = null;
      state.user = null;
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;

