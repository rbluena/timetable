import { createSelector } from 'reselect';

const selectAnnouncements = (state) => {
  const { notificationIds, notifications } = state.NOTIFICATIONS;

  if (notificationIds && notificationIds.length) {
    return notificationIds.map((notificationId) => ({
      ...notifications[notificationId],
    }));
  }

  return [];
};

// eslint-disable-next-line import/prefer-default-export
export const announcementsSelector = createSelector(
  selectAnnouncements,
  (board) => board
);
