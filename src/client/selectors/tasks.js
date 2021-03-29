import { createSelector } from 'reselect';

const selectCalendarTasks = (state) => {
  const { data } = state.TASKS;
  return data || [];
};

const selectProjectAssignees = (state) => {
  const { members: users, groups } = state.PROJECTS;
  return { users, groups };
};

const selectBacklog = (state) => {
  const { backlogIds, backlog, backlogMeta } = state.TASKS
  return {backlogIds, backlog, backlogMeta }
}

const selectTaskAssignees = (state) => {
  const { groupAssignees, userAssignees } = state.TASKS

  return { groupAssignees, userAssignees}
}

const selectTaskCategories = (state) => {
  const { categories } = state.PROJECTS;
  return categories;
};


export const backlogSelector = createSelector(selectBacklog, backlog => backlog)

export const tasksStateSelector = createSelector(
  (state) => state.TASKS,
  (tasks) => tasks
);

export const calendarTasksSelector = createSelector(
  selectCalendarTasks,
  (tasks) => tasks
);

export const projectAssigneesSelector = createSelector(
  selectProjectAssignees,
  (assignees) => assignees
);

export const taskAssigneesSelector = createSelector(
  selectTaskAssignees,
  (assignees) => assignees
);

export const taskCategoriesSelector = createSelector(
  selectTaskCategories,
  (categories) => categories
);
