import { get } from 'lodash';
import { createSelector } from 'reselect';

const selectProject = (state) => {
  const { project, projectId } = state.PROJECTS;

  if (projectId && project) {
    return project[projectId];
  }
  return {};
};

const selectCalendarTasks = (state) => {
  const { data } = state.TASKS;
  return data || [];
};

const selectBacklog = (state) => {
  const { backlogIds, tasks, backlogMeta } = state.TASKS;
  const mappedTasks = {};

  return { backlogIds, tasks, backlogMeta };
};

const selectBoardData = (state) => {
  const { team, groups } = state.PROJECTS;
  const { backlogIds, tasks } = state.TASKS;
  let backlog = [];

  if (backlogIds && backlogIds.length) {
    backlog = backlogIds.map((backlogId) => {
      const task = { ...tasks[backlogId] };
      task.userAssignees = task.userAssignees.map((userId) => ({
        ...team[userId],
      }));

      task.groupAssignees = task.groupAssignees.map((groupId) => ({
        ...groups[groupId],
      }));

      return task;
    });
  }

  return { backlog };
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

export const boardDataSelector = createSelector(
  selectBoardData,
  (data) => data
);
