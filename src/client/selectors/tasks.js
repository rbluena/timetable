import { createSelector } from 'reselect';

export const tasksStateSelector = createSelector(
  (state) => state.TASKS,
  (tasks) => tasks
);
