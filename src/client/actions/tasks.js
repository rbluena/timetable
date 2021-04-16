import { decode } from 'jsonwebtoken';
import { omit } from 'lodash';
import { setNotificationAction, signUserOutAction } from '@app/actions';

import {
  createTaskService,
  getTaskService,
  getProjectTasksService,
  // updateTaskService,
  deleteTaskService,
  getTasksByStatusService,
} from '@app/services';

import {
  setOpenedTask,
  setEditingTask,
  setNewTask,
  cancelEditingTask,
  createTask,
  createTaskSuccess,
  createTaskFailure,
  updateTask,
  updateTaskSuccess,
  updateTaskFailure,
  getBoardTasksSuccess,
  getTasksSuccess,
  tasksPaginationSuccess,
  // removeTask,
  // removeTaskSuccess,
} from '@app/reducers/tasksReducer';

import { getProjectStatusesSuccess } from '@app/reducers/statusesReducer';

import {
  getNormalizedBacklog,
  getNormalizedStatues,
  getNormalizedTask,
  getNormalizedTasks,
} from './schema';

export function setEditingTaskAction(data) {
  return {
    type: setEditingTask,
    payload: data,
  };
}

export function addNewTaskAction(data) {
  return async (dispatch) => {
    try {
      dispatch({
        type: setNewTask,
        payload: data,
      });
    } catch (error) {}
  };
}

export function cancelEditingTaskAction(data) {
  return async (dispatch) => {
    // Remove task if exists
    dispatch({
      type: cancelEditingTask,
      payload: data._id,
    });
  };
}
/**
 * Action to create a task.
 * @param {Object} taskData
 */
export function createTaskAction(taskData) {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: createTask });

      const {
        AUTH: { token },
        PROJECTS: { projectId },
      } = getState();

      const user = decode(token);

      const { data } = await createTaskService(
        projectId,
        {
          ...omit(taskData, '_id'),

          creator: user._id,
          project: projectId,
        },
        token
      );

      const normalizedData = getNormalizedTask(data);

      dispatch({
        type: createTaskSuccess,
        payload: normalizedData,
      });

      // dispatch(setNotification({ type: 'success', message }));
    } catch (error) {
      const err = {
        type: 'error',
        message: error.errors || error.message,
      };

      dispatch(setNotificationAction(err));

      if (error.status === 403) {
        dispatch(signUserOutAction());
      }
      dispatch({ type: createTaskFailure });
    }
  };
}

/**
 * Action to update task
 * @param {string} id
 * @param {Object} taskData
 */
export function updateTaskAction(id, taskData) {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: updateTask });

      // const { token } = getState().AUTH;
      // const { data, message } = await updateTaskService(token, id, taskData);
      dispatch({ type: updateTaskSuccess, payload: taskData });
      // dispatch(setNotification({ type: 'success', message }));
    } catch (error) {
      dispatch({ type: updateTaskFailure });
    }
  };
}

/**
 * Action to delete a task.
 * @param {string} id
 */
export function deleteTaskAction(id) {
  return async (dispatch, getState) => {
    try {
      const { token } = getState().auth;

      const { message } = await deleteTaskService(token, id);

      // dispatch(deleteLink());
      // dispatch(deleteLinkSuccess(id));
      // dispatch(setNotification({ type: 'success', message }));
    } catch (err) {
      // dispatch(deleteLinkFailure());
      // const error = {
      //   type: 'error',
      //   message: err.errors,
      // };
      // dispatch(setNotification(error));
    }
  };
}

export const getProjectTasksAction = (projectId, options = {}) => async (
  dispatch,
  getState
) => {
  try {
    const {
      AUTH: { token },
    } = getState();

    const { data, meta } = await getProjectTasksService(
      projectId,
      options,
      token
    );

    console.log(data);
    console.log(meta);
  } catch (error) {
    console.log(error);
  }
};

export const getTasksByStatusAction = (projectId, options) => async (
  dispatch,
  getState
) => {
  try {
    const { token } = getState().AUTH;

    const { data } = await getTasksByStatusService(projectId, options);

    // console.log(data);
  } catch (error) {
    // console.log(error);
  }
};

/**
 * Setting task that is opened.
 * @param {String} id Task id
 */
export const setOpenedTaskAction = (id, projectId = null) => async (
  dispatch,
  getState
) => {
  const { token } = getState().AUTH;

  if (id && projectId) {
    const { data } = await getTaskService(projectId, id, token);

    dispatch({
      type: setOpenedTask,
      payload: data,
    });
  }
};

export const getAgendaTasksAction = (data, meta) => async (dispatch) => {
  try {
    const normalizedTasks = getNormalizedTasks(data);

    dispatch({
      type: getTasksSuccess,
      payload: {
        ...normalizedTasks,
        meta,
      },
    });
  } catch (error) {
    // console.log(error);
  }
};

export const loadPrevTasksAction = (date) => async (dispatch, getState) => {
  try {
    const {
      AUTH: { token },
      TASKS: { meta: pagination },
      PROJECTS: { projectId },
    } = getState();

    if (date) {
      const { data, meta } = await getProjectTasksService(
        projectId,
        { from: pagination.previousPage },
        token
      );

      const normalizedTasks = getNormalizedTasks(data);

      dispatch({
        type: tasksPaginationSuccess,
        payload: {
          ...normalizedTasks,
          meta: {
            ...pagination,
            hasPreviousPage: meta.hasPreviousPage,
            previousPage: meta.previousPage,
          },
        },
      });
    }
  } catch (error) {
    // console.log(error);
  }
};

export const loadNextTasksAction = () => async (dispatch, getState) => {
  try {
    const {
      AUTH: { token },
      TASKS: { meta: pagination },
      PROJECTS: { projectId },
    } = getState();

    if (pagination && pagination.hasNextPage) {
      const { data, meta } = await getProjectTasksService(
        projectId,
        { page: pagination.nextPage },
        token
      );

      const normalizedTasks = getNormalizedTasks(data);

      dispatch({
        type: tasksPaginationSuccess,
        payload: {
          ...normalizedTasks,
          meta: {
            ...pagination,
            hasNextPage: meta.hasNextPage,
            nextPage: meta.nextPage,
          },
        },
      });
    }
  } catch (error) {
    // console.log(error);
  }
};

/**
 * Rendering tasks for project board.
 * @param {Array} statuses List of statuses for board's columns
 * @param {Array} backlogData List of backlog data
 * @param {Object} backlogMeta Pagination information for backlog
 */
export const getBoardTasksAction = (
  statuses,
  backlogData,
  backlogMeta
) => async (dispatch) => {
  const normalizedStatuses = getNormalizedStatues(statuses);
  const normalizedBacklog = getNormalizedBacklog(backlogData);

  const { result: statusIds, entities: statusEntities } = normalizedStatuses;
  const { result: backlogIds, entities: backlogEntities } = normalizedBacklog;

  const tasks = { ...statusEntities.tasks, ...backlogEntities.tasks };

  dispatch({
    type: getProjectStatusesSuccess,
    payload: {
      statusIds,
      statuses: statusEntities.statuses,
    },
  });

  dispatch({
    type: getBoardTasksSuccess,
    payload: {
      // userAssignees: backlogEntities.userAssignees || [],
      // groupAssignees: backlogEntities.groupAssignees || [],
      backlogIds,
      tasks,
      backlogMeta,
    },
  });
};
