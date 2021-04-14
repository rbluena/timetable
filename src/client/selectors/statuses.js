import { get } from 'lodash';
import { createSelector } from 'reselect';

const selectStatuses = (state) => {
  const statuses = get(state, 'STATUSES.statuses');
  const statusIds = get(state, 'STATUSES.statusIds');

  if (statusIds && statusIds.length) {
    return statusIds.map((statusId) => ({ ...statuses[statusId] }));
  }

  return [];
};

const selectBoard = (state) => {
  const { team, groups } = state.PROJECTS;
  const { tasks } = state.TASKS;
  let statuses = selectStatuses(state);

  if (statuses && statuses.length) {
    statuses = statuses.map((status) => {
      if (status.tasks && status.tasks.length) {
        status.tasks = status.tasks.map((taskId) => {
          const task = { ...tasks[taskId] };

          if (task.userAssignees && task.userAssignees.length > 0) {
            task.userAssignees = task.userAssignees.map((userId) => ({
              ...team[userId],
            }));
          }

          if (task.groupAssignees && task.groupAssignees.length) {
            task.groupAssignees = task.groupAssignees.map((groupId) => ({
              ...groups[groupId],
            }));
          }

          return task;
        });
      }
      return status;
    });
  }

  return { columns: statuses };
};

// eslint-disable-next-line import/prefer-default-export
export const boardSelector = createSelector(selectBoard, (board) => board);
