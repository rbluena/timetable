import { createSelector } from 'reselect';

export const globalStateSelector = createSelector(
  (state) => state.GLOBAL,
  (global) => global
);

export const getGlobalNotification = createSelector(
  (state) => state.GLOBAL.notification,
  (notification) => notification
);
