import { combineReducers } from 'redux-immer';
import produce from 'immer';
import authReducer from './authReducer';
import globalReducer from './globalReducer';
import tasksReducer from './tasksReducer';

export default combineReducers(produce, {
  AUTH: authReducer,
  GLOBAL: globalReducer,
  TASKS: tasksReducer,
});
