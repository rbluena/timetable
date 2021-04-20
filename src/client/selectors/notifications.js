import { createSelector } from 'reselect';
import { selectAuthenticatedUser } from './auth';

const selectAnnouncements = (state) => {
  const { notificationIds, notifications } = state.NOTIFICATIONS;
  const user = selectAuthenticatedUser(state);

  if (notificationIds && notificationIds.length) {
    return notificationIds.map((notificationId) => {
      const notification = { ...notifications[notificationId] };

      notification.isCurrentUserAuthor = !!(
        user && user._id === notification.creator._id
      );

      return notification;
    });
  }

  return [];
};

// eslint-disable-next-line import/prefer-default-export
export const announcementsSelector = createSelector(
  selectAnnouncements,
  (board) => board
);
