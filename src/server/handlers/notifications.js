const { omit } = require('lodash');
const { decode } = require('jsonwebtoken');
const {
  createNotificationService,
  getNotificationsService,
  deleteNotificationService,
} = require('../services/notifications');

/**
 * Request handler for creating new notification.
 */
exports.createNotificationHandler = async (req, res, next) => {
  try {
    const user = decode(req.app.jwt);
    const notification = { creator: user._id, ...req.body };
    const doc = await createNotificationService(notification);

    return res.status(201).json({
      status: 201,
      success: true,
      message: 'Notification was created successfully!',
      data: doc,
    });
  } catch (error) {
    return next(error);
  }
};

/**
 * Handler to access notifications
 */
exports.getNotificationsHandler = async (req, res, next) => {
  try {
    const { query } = req;
    const user = decode(req.app.jwt);
    const data = await getNotificationsService(query, user ? user._id : null);
    const meta = omit(data, 'docs');
    const { docs } = data;

    res.status(200).json({
      status: 200,
      success: true,
      message: '',
      data: docs,
      meta,
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteNotificationsHandler = async (req, res, next) => {
  try {
    const { notificationId } = req.params;
    const doc = await deleteNotificationService(notificationId);

    res.status(200).json({
      status: 200,
      success: true,
      message: 'Notification was deleted successfull',
      data: { ...doc },
    });
  } catch (error) {
    next(error);
  }
};
