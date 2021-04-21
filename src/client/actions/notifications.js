import {
  createNotificationService,
  deleteNotificationService,
} from '@app/services';

import { setNotificationAction, signUserOutAction } from '@app/actions';
import {
  createNotification,
  createNotificationSuccess,
  deleteNotificationSuccess,
} from '@app/reducers/notificationsReducer';

/**
 * Action to create notification.
 * @param {String} projectId
 * @param {Object} notification
 */
export function createNotificationAction(projectId, notification) {
  return async (dispatch, getState) => {
    dispatch({ type: createNotification });

    try {
      const { token } = getState().AUTH;
      const { data } = await createNotificationService(
        projectId,
        notification,
        token
      );

      dispatch({
        type: createNotificationSuccess,
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

// export function editMessageAction(projectId, messagedId, messageData) {
//   return async (dispatch, getState) => {
//     try {
//       const { token } = getState().AUTH;
//       const { data } = await createNotificationService(
//         projectId,
//         messageData,
//         token
//       );

//     } catch (error) {
//       // TODO: REPORT ERROR
//       console.log(error);
//     }
//   };
// }

/**
 * Deleting notification from the server
 * @param {String} projectId ID of the project
 * @param {String} notificationId
 */
export function deleteNotificationAction(projectId, notificationId) {
  return async (dispatch, getState) => {
    try {
      const { token } = getState().AUTH;
      const { data } = await deleteNotificationService(
        projectId,
        notificationId,
        token
      );

      dispatch({
        type: deleteNotificationSuccess,
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
