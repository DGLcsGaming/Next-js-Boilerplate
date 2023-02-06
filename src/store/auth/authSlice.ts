import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: { user: null, tokens: null },
  reducers: {
    setCredentials: (state, action) => {
      const { user, tokens } = action.payload;
      state.user = user;
      state.tokens = tokens;
    },
    logOut: (state) => {
      state.user = null;
      state.tokens = null;
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state: any) => state.auth.user;
export const selectCurrentToken = (state: any) => state.auth.tokens;
