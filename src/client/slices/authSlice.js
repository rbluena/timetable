import { createSlice } from '@reduxjs/toolkit';

// INITIAL STATE
const initialState = {
  fetching: false,
  token: null,
  type: null, // 'google-oauth' or 'local'
  profile: null,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,

  reducers: {
    loginUser: {
      reducer: (state) => {
        state.fetching = true;
      },
    },
    loginUserSuccess: {
      reducer: (state, { payload }) => {
        state.fetching = false;
        state.token = payload.jwt;
      },
    },
    loginUserFailure: {
      reducer: (state) => {
        state.fetching = false;
      },
    },
    logoutUser: {
      reducer: (state) => {
        state.fetching = true;
      },
    },
    logoutUserSuccess: {
      reducer: (state) => {
        state.fetching = false;
        state.token = null;
        state.type = null;
        state.error = false;
      },
    },
    logoutUserFailure: {
      reducer: (state) => {
        state.fetching = false;
      },
    },
    registerUser: {
      reducer: (state) => {
        state.fetching = true;
      },
    },
    registerUserSuccess: {
      reducer: (state) => {
        state.fetching = false;
      },
    },
    registerUserFailure: {
      reducer: (state) => {
        state.fetching = false;
      },
    },
    updateUser: {
      reducer: (state) => {
        state.fetching = true;
      },
    },
    updateUserSuccess: {
      reducer: (state, { payload }) => {
        state.fetching = false;
        state.token = payload;
      },
    },
    updateUserFailure: {
      reducer: (state) => {
        state.fetching = false;
      },
    },
    resettingAuthState: {
      reducer: (state) => {
        state.fetching = false;
        state.token = null;
        state.error = false;
      },
    },
    getUserProfileSuccess: {
      reducer: (state, { payload }) => {
        state.fetching = false;
        state.profile = payload;
        state.error = false;
      },
    },
    toggleFollowingSuccess: {
      reducer: (state, { payload }) => {
        state.fetching = false;
        state.profile = payload;
        state.error = false;
      },
    },
  },
});

export const {
  loginUser,
  loginUserSuccess,
  loginUserFailure,
  logoutUser,
  logoutUserSuccess,
  logoutUserFailure,
  registerUser,
  registerUserSuccess,
  registerUserFailure,
  updateUser,
  updateUserSuccess,
  updateUserFailure,
  getUserProfileSuccess,
  toggleFollowingSuccess,
} = authSlice.actions;

export default authSlice.reducer;
