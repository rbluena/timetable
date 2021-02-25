import { createSelector } from 'reselect';

export const globalStateSelector = createSelector(
  (state) => state.GLOBAL,
  (global) => global
);
