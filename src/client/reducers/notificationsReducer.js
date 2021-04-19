export const setProjectStatuses = 'NOTIFICATIONS/GET_STATUSES';
export const getProjectStatusesSuccess = 'NOTIFICATIONS/GET_STATUSES_SUCCESS';
export const createNotification = 'NOTIFICATIONS/CREATE_NOTIFICATION';
export const createNotificationSuccess =
  'NOTIFICATIONS/CREATE_NOTIFICATION_SUCCESS';
export const updateStatusItemSuccess = 'NOTIFICATIONS/UPDATE_STATUS_SUCCESS';
export const deleteStatusItemSuccess = 'NOTIFICATIONS/DELETE_STATUS_SUCCESS';

const initialState = {
  fetching: false,
  notificationIds: [],
};

export default function notificationsReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case createNotification: {
      state.fetching = true;
      return state;
    }

    case createNotificationSuccess: {
      return {
        ...state,
        fetching: false,
        notifications: {
          ...state.notifications,
          [payload._id]: payload,
        },
        notificationIds: [payload._id, ...state.notificationIds],
      };
    }

    default:
      return state;
  }
}
