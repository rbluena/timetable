import { createSelector } from 'reselect';
import { groupTasksBasedOnDate } from '@app/utils';
import { selectProjectCategories } from './projects';

const selectCalendarTasks = (state) => {
  const { tasks, taskIds } = state.TASKS;
  let data = [];

  if (taskIds && taskIds.length) {
    data = taskIds.map((taskId) => ({
      ...tasks[taskId],
    }));
  }

  return data;
};

const selectTasks = (state) => {
  const categories = selectProjectCategories(state);
  const { team, groups } = state.PROJECTS;
  const { tasks, taskIds } = state.TASKS;
  let data = [];

  if (taskIds && taskIds.length) {
    data = taskIds.map((taskId) => {
      const task = { ...tasks[taskId] };

      task.category = task.category ? categories[task.category] : undefined;

      task.userAssignees = task.userAssignees.map((userId) => ({
        ...team[userId],
      }));

      task.groupAssignees = task.groupAssignees.map((groupId) => ({
        ...groups[groupId],
      }));

      return task;
    });
  }

  return data;
};

const selectAgendaTasks = (state) => {
  const tasks = selectTasks(state);
  return groupTasksBasedOnDate(tasks);
};

const selectBacklog = (state) => {
  const { backlogIds, tasks, backlogMeta } = state.TASKS;
  return { backlogIds, tasks, backlogMeta };
};

const selectBoardData = (state) => {
  const { team, groups } = state.PROJECTS;
  const { backlogIds, tasks } = state.TASKS;
  let backlog = [];

  if (backlogIds && backlogIds.length) {
    backlog = backlogIds.map((backlogId) => {
      const task = { ...tasks[backlogId] };

      if (task.userAssignees) {
        task.userAssignees = task.userAssignees.map((userId) => ({
          ...team[userId],
        }));
      }

      if (task.groupAssignees) {
        task.groupAssignees = task.groupAssignees.map((groupId) => ({
          ...groups[groupId],
        }));
      }

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

export const getOpenedTaskSelector = createSelector(
  (state) => state.TASKS.openedTask,
  (task) => task
);

export const backlogSelector = createSelector(
  selectBacklog,
  (backlog) => backlog
);

export const tasksSelector = createSelector(selectTasks, (tasks) => tasks);

export const agendaTasksSelector = createSelector(
  selectAgendaTasks,
  (tasks) => tasks
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
