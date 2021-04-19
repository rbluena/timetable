import { combineReducers } from 'redux-immer';
import produce from 'immer';
import authReducer from './authReducer';
import globalReducer from './globalReducer';
import tasksReducer from './tasksReducer';
import projectsReducer from './projectsReducer';
import statusesReducer from './statusesReducer';
import notificationsReducer from './notificationsReducer';

export default combineReducers(produce, {
  AUTH: authReducer,
  GLOBAL: globalReducer,
  TASKS: tasksReducer,
  PROJECTS: projectsReducer,
  STATUSES: statusesReducer,
  NOTIFICATIONS: notificationsReducer,
});
