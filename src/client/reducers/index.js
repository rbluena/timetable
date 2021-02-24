import { combineReducers } from 'redux-immer';
import produce from 'immer';
import authReducer from './authReducer';
import globalReducer from './globalReducer';

export default combineReducers(produce, {
  AUTH: authReducer,
  GLOBAL: globalReducer,
});
