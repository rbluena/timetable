import { createSelector } from 'reselect';

const selectCalendarTasks = (state) => {
  const { data } = state.TASKS;
  return data || [];
};

const selectBacklog = (state) => {
  const { backlogIds, tasks, backlogMeta } = state.TASKS;
  return { backlogIds, tasks, backlogMeta };
};

const selectTaskAssignees = (state) => {
  const { groupAssignees, userAssignees } = state.TASKS;

  return { groupAssignees, userAssignees };
};

const selectTaskCategories = (state) => {
  const { categories } = state.PROJECTS;
  return categories;
};

export const backlogSelector = createSelector(
  selectBacklog,
  (backlog) => backlog
);

export const tasksStateSelector = createSelector(
  (state) => state.TASKS,
  (tasks) => tasks
);

export const calendarTasksSelector = createSelector(
  selectCalendarTasks,
  (tasks) => tasks
);

export const taskAssigneesSelector = createSelector(
  selectTaskAssignees,
  (assignees) => assignees
);

export const taskCategoriesSelector = createSelector(
  selectTaskCategories,
  (categories) => categories
);
