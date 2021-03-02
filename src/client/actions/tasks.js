import { decode } from 'jsonwebtoken';
import {
  createTaskService,
  // updateTaskService,
  deleteTaskService,
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
  // removeTask,
  // removeTaskSuccess,
} from '@app/reducers/tasksReducer';

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

      const { token } = getState().AUTH;
      const user = decode(token);

      const { data } = await createTaskService(token, {
        ...taskData,
        creator: user._id,
      });

      dispatch({
        type: createTaskSuccess,
        payload: data,
      });

      // dispatch(setNotification({ type: 'success', message }));
    } catch (error) {
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

export const setOpenedTaskAction = (id) => ({
  type: setOpenedTask,
  payload: id,
});
