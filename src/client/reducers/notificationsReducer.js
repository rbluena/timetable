export const getNotifications = 'NOTIFICATIONS/GET_NOTIFICATIONS';
export const getNotificationsSuccess =
  'NOTIFICATIONS/GET_NOTIFICATIONS_SUCCESS';
export const createNotification = 'NOTIFICATIONS/CREATE_NOTIFICATION';
export const createNotificationSuccess =
  'NOTIFICATIONS/CREATE_NOTIFICATION_SUCCESS';
export const deleteNotificationSuccess = 'NOTIFICATIONS/DELETE_NOTIFICATION';

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

    case getNotificationsSuccess: {
      const { entities, result: notificationIds, meta } = payload;

      return {
        ...state,
        fetching: false,
        notifications: {
          ...state.notifications,
          ...entities.notifications,
        },
        notificationIds: [...state.notificationIds, ...notificationIds],
        meta,
      };
    }

    case deleteNotificationSuccess: {
      const { _id: id } = payload;

      state.notificationIds = state.notificationIds.filter(
        (item) => item !== id
      );
      delete state.notifications[id];

      return state;
    }

    default:
      return state;
  }
}
