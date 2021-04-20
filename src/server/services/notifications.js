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

const getNotificationsService = async (options, userId) => {
  const user = await User.findOne({
    _id: mongoose.Types.ObjectId(userId),
  })
    .select('groups')
    .lean();

  const match = {
    $or: [
      { creator: mongoose.Types.ObjectId(userId) },
      { 'recepient.id': userId },
      { 'recepient.id': 'all' },
      { 'recepient.id': { $in: user ? user.groups : [] } },
    ],
  };
  const sort = { createdAt: -1 };
  const paginateOptions = { limit: 20 };

  if (options.project) {
    match.project = mongoose.Types.ObjectId(options.project);
  }

  const aggregate = Notification.aggregate([
    { $match: match },
    { $sort: sort },
    {
      $lookup: {
        from: User.collection.name,
        localField: 'creator',
        foreignField: '_id',
        as: 'creator',
      },
    },
    { $unwind: '$creator' },
    {
      $project: {
        seenBy: 1,
        body: 1,
        recepient: 1,
        type: 1,
        createdAt: 1,
        'creator._id': 1,
        'creator.fullName': 1,
        'creator.image': 1,
        hasUserSeenIt: {
          $in: [mongoose.Types.ObjectId(userId), { $ifNull: ['$seenBy', []] }],
        },
        isUserCreator: {
          $eq: ['$creator._id', mongoose.Types.ObjectId(userId)],
        },
        // likesCount: { $size: { $ifNull: ['$likes', []] } },
      },
    },
  ]);

  return Notification.aggregatePaginate(aggregate, paginateOptions);
};

module.exports = {
  createNotificationService,
  getNotificationsService,
};
