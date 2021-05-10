import {
  createProjectStatus,
  updateStatusItemService,
  deleteStatusItemService,
  updateTaskStatusService,
} from '@app/services';

import {
  createProjectStatusSuccess,
  updateStatusItemSuccess,
  deleteStatusItemSuccess,
  assignTaskStatusSuccess,
  unassignTaskStatusSuccess,
} from '@app/reducers/statusesReducer';

import {
  backlogTaskAssingingStatusSuccess,
  moveTasksToBacklog,
} from '@app/reducers/tasksReducer';

import { setNotificationAction, signUserOutAction } from '@app/actions';

/**
 * Creating new status
 * @param {String} projectId ID of the project.
 * @param {Object} statusData
 */
export function createNewStatusAction(projectId, statusData) {
  return async (dispatch, getState) => {
    try {
      const { token } = getState().AUTH;

      const { data } = await createProjectStatus(projectId, statusData, token);

      dispatch({
        type: createProjectStatusSuccess,
        payload: data,
      });
    } catch (error) {
      const err = {
        type: 'error',
        message: error.errors || error.message,
      };

      dispatch(setNotificationAction(err));

      if (error.status === 403) {
        // Sign user out if not authenticated
        dispatch(signUserOutAction());
      }
    }
  };
}

/**
 * Updating status details.
 * @param {String} projectId ID of the project.
 * @param {Object} statusData Data of the status to be updated.
 */
export function updateStatusAction(projectId, statusId, statusData) {
  return async (dispatch, getState) => {
    try {
      const { token } = getState().AUTH;

      const { data } = await updateStatusItemService(
        projectId,
        statusId,
        statusData,
        token
      );

      dispatch({
        type: updateStatusItemSuccess,
        payload: data,
      });
    } catch (error) {
      const err = {
        type: 'error',
        message: error.errors || error.message,
      };

      dispatch(setNotificationAction(err));

      if (error.status === 403) {
        // Sign user out if not authenticated
        dispatch(signUserOutAction());
      }
    }
  };
}

/**
 * Action creator to delete a status
 * @param {String} projectId ID of a status
 * @param {String} statusId ID of a status
 */
export function deleteStatusAction(projectId, statusId) {
  return async (dispatch, getState) => {
    try {
      const {
        AUTH: { token },
        STATUSES: { statuses },
      } = getState();

      const { tasks } = statuses[statusId];

      const { data } = await deleteStatusItemService(
        token,
        projectId,
        statusId
      );

      dispatch({
        type: deleteStatusItemSuccess,
        payload: data,
      });

      if (tasks && tasks.length) {
        // Move items back to the backlog
        dispatch({
          type: moveTasksToBacklog,
          payload: tasks || [],
        });
      }

      // Refreshing the backlog.
    } catch (error) {
      const err = {
        type: 'error',
        message: error.errors || error.message,
      };

      dispatch(setNotificationAction(err));

      if (error.status === 403) {
        // Sign user out if not authenticated
        dispatch(signUserOutAction());
      }
    }
  };
}

/**
 * Assigning task a status when moved from one column to another.
 * @param {String} draggableId ID of the task being moved.
 * @param {Object} source Position of the task and id of the column where task is moved from.
 * @param {Object} destination Position and ID of the column where task is moved to.
 */
export function assigningTaskStatusAction(
  projectId,
  draggableId,
  source,
  destination
) {
  return async (dispatch, getState) => {
    try {
      const { token } = getState().AUTH;

      const movingItem = {
        source,
        destination,
      };

      if (
        destination.droppableId === 'backlog' &&
        source.droppableId !== 'backlog'
      ) {
        // 1). Moving item to the backlog
        dispatch({
          type: backlogTaskAssingingStatusSuccess,
          payload: {
            taskId: draggableId,
            index: destination.index,
            type: 'adding',
          },
        });

        // 2). Remove item from the board column
        dispatch({
          type: unassignTaskStatusSuccess,
          payload: {
            taskId: draggableId,
            statusId: source.droppableId,
            index: source.index,
          },
        });
      }

      if (
        source.droppableId === 'backlog' &&
        destination.droppableId !== 'backlog'
      ) {
        // Moving from the backlog therefore
        // 1). Moving item from the backlog.
        dispatch({
          type: backlogTaskAssingingStatusSuccess,
          payload: {
            taskId: draggableId,
            type: 'remove',
          },
        });

        // 2). Moving item to the board.
        dispatch({
          type: assignTaskStatusSuccess,
          payload: {
            taskId: draggableId,
            statusId: destination.droppableId,
            index: destination.index,
          },
        });
      }

      if (
        source.droppableId !== 'backlog' &&
        destination.droppableId !== 'backlog'
      ) {
        // Moving item from one colum to another
        // in the same board.
        dispatch({
          type: assignTaskStatusSuccess,
          payload: {
            taskId: draggableId,
            statusId: destination.droppableId,
            index: destination.index,
          },
        });

        dispatch({
          type: unassignTaskStatusSuccess,
          payload: {
            taskId: draggableId,
            statusId: source.droppableId,
            index: source.index,
          },
        });
      }

      await updateTaskStatusService(projectId, draggableId, movingItem, token);
    } catch (error) {
      const err = {
        type: 'error',
        message: error.errors || error.message,
      };

      dispatch(setNotificationAction(err));

      if (error.status === 403) {
        // Sign user out if not authenticated
        dispatch(signUserOutAction());
      }
    }
  };
}

export function unAssignTaskStatusAction(taskId, statusId) {
  return {
    type: unassignTaskStatusSuccess,
    payload: {
      taskId,
      statusId,
    },
  };
}
