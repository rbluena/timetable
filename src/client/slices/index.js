import { combineReducers } from '@reduxjs/toolkit';
import authSlice from './authSlice';

export default combineReducers({
  // global: globalSlice,
  auth: authSlice,
  // links: linksSlice,
  // comments: commentSlice,
});
