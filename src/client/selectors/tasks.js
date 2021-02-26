import { createSelector } from 'reselect';

const selectCalendarTasks = (state) => {
  const { data } = state.TASKS;
  return data || [];
};

export const tasksStateSelector = createSelector(
  (state) => state.TASKS,
  (tasks) => tasks
);

export const calendarTasksSelector = createSelector(
  selectCalendarTasks,
  (tasks) => tasks
);
