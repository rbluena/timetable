import {
  createProjectStatus,
  updateStatusItemService,
  deleteStatusItemService,
} from '@app/services';

import {
  createProjectStatusSuccess,
  updateStatusItemSuccess,
  deleteStatusItemSuccess,
} from '@app/reducers/statusesReducer';

import { setNotificationAction, signUserOutAction } from '@app/actions';

/**
 * Creating new status
 * @param {String} projectId ID of the project.
 * @param {Object} statusData
 */
export function createNewStatusAction(projectId, statusData) {
  return async (dispatch, getState) => {
    try {
      // dispatch({ type: createNewStatus });

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
 * Updating status item of the project.
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
      const { token } = getState().AUTH;

      const { data } = await deleteStatusItemService(
        token,
        projectId,
        statusId
      );

      dispatch({
        type: deleteStatusItemSuccess,
        payload: data,
      });

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
