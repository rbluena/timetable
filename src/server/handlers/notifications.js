const { decode } = require('jsonwebtoken');
const { createNotificationService } = require('../services/notifications');

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
