const mongoose = require('mongoose');
const Notification = require('../models/Notification');
const User = require('../models/User');

const createNotificationService = async (data) => {
  const notification = new Notification(data);
  const savedNotification = await notification.save();

  if (savedNotification) {
    await User.updateOne(
      { _id: mongoose.Types.ObjectId(data.creator) },
      { $push: { notifications: savedNotification._id } }
    );

    await Notification.populate(savedNotification, {
      path: 'creator',
      select: '_id fullName image',
    });

    const notificationObj = {
      ...savedNotification._doc,
      isUserCreator: true,
      hasUserSeenIt: true,
    };

    delete notificationObj.seenBy;
    delete notificationObj.pinners;
    delete notificationObj.mentions;

    return notificationObj;
  }

  throw new Error('Failed to add resource. Our team is working on it.');
};

module.exports = {
  createNotificationService,
};
