const mongoose = require('mongoose');
const { uniq } = require('lodash');
const Task = require('../models/Task');
const Project = require('../models/Project');
const User = require('../models/User');
const { findUserById } = require('./user');

/**
 * Service to create new task.
 * @param {Object} data
 */
const createTaskService = async (data) => {
  const task = new Task(data);
  const saved = await task.save();

  if (saved) {
    const user = await findUserById(data.creator);
    user.tasks.push(saved._id);
    await user.save();

    if (data.assignees) {
      data.assignees.forEach((userId) => {
        User.updateOne(
          { _id: mongoose.Types.ObjectId(userId) },
          { $addToSet: { assignedTasks: saved._id } }
        );
      });
    }
  }

  if (saved) {
    const project = await Project.findOne({ _id: data.project });
    project.tasks.push(saved._id);
    project.save();
  }

  return saved;
};

/**
 * Service to update existing task
 * @param {String} taskId
 * @param {Object} data
 */
const updateTaskService = async (taskId, data) => {
  const doc = await Task.findOne({ _id: taskId });

  Object.keys(data).forEach((key) => {
    doc[key] = data[key];
  });

  const updated = await doc.save();

  if (!updated) {
    throw Error('Something went wrong. Our team are fixing it');
  }

  // await Task.populate(updated, 'owner');

  return updated.toObject();
};

/**
 * Assigning tasks to the user.
 * @param {String} taskId
 * @param {Array} assignees
 */
const assignUserTaskService = async (taskId, assignees) => {
  const found = await Task.findOne({ _id: taskId });

  if (assignees && assignees.length > 0) {
    const newAssignees = uniq([...found.assignees, ...assignees]);
    found.assignees = newAssignees;
    const saved = await found.save();

    if (saved) {
      assignees.forEach((userId) => {
        User.updateOne(
          { _id: mongoose.Types.ObjectId(userId) },
          { $addToSet: { assignedTasks: taskId } }
        );
      });
    }

    return saved.toObject();
  }

  throw new Error('Failed to create a task.');
};

/**
 * Deleting task based on id.
 * @param {String} taskId
 */
const deleteTaskService = async (taskId) => {
  const found = await Task.findOne({ _id: taskId });

  found.deleted = true;
  const deleted = await found.save();

  return {
    _id: deleted._doc._id,
  };
};

/**
 * Retrieving task based on task id
 * @param {String} taskId
 */
const getTaskByIdService = async (taskId) => {
  const link = await Task.findOne({
    _id: mongoose.Types.ObjectId(taskId),
  }).lean();

  return link;
};

/**
 * Grabing all links for the user.
 * @param {Object} options
 */
const getTasksService = async (options) => {
  const match = {};
  const paginateOptions = { limit: 15 };
  let sort = { start: -1 };

  const { limit, page, sort: sortQuery } = options;

  if (sortQuery) {
    // Property to be sorted and type to be either ascending or descending
    sort = { [sortQuery.property]: sortQuery.type };
  }

  if (limit) {
    paginateOptions.limit = parseInt(limit, 10);
  }

  if (page) {
    paginateOptions.page = parseInt(page, 10);
  }

  if (options.project) {
    match.project = mongoose.Types.ObjectId(options.project);
  }

  if (options.creator) {
    match.creator = mongoose.Types.ObjectId(options.creator);
  }

  if (options.category) {
    match.category = mongoose.Types.ObjectId(options.category);
  }

  const aggregate = Task.aggregate([
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
  ]);

  return Task.aggregatePaginate(aggregate, paginateOptions);
};

/**
 * Retrieving waitings from the list.
 * @param {String} userId
 */
/* const getWaitingLinksService = async (userId, options = {}) => {
  const paginateOptions = { limit: 15 };
  const { limit, page } = options;

  // const waitings = await Task.find({
  //   waitings: { $in: [mongoose.Types.ObjectId(userId)] },
  // }).populate('owner', 'firstname lastname username brandname prominent');

  if (page) {
    paginateOptions.page = parseInt(page, 10);
  }

  if (limit) {
    paginateOptions.limit = parseInt(limit, 10);
  }

  const aggregate = Task.aggregate([
    { $match: { waitings: { $in: [mongoose.Types.ObjectId(userId)] } } },
    { $sort: { createdAt: -1 } },
    {
      $lookup: {
        from: User.collection.name,
        localField: 'owner',
        foreignField: '_id',
        as: 'owner',
      },
    },
    { $unwind: '$owner' },
    {
      $project: {
        _id: 1,
        title: 1,
        description: 1,
        shortenUrl: 1,
        longUrl: 1,
        postUrl: 1,
        topic: 1,
        category: 1,
        isActive: 1,
        availableDate: 1,
        waitings: 1,
        isUserWaiting: {
          $in: [
            mongoose.Types.ObjectId(userId),
            { $ifNull: ['$waitings', []] },
          ],
        },
        'owner._id': 1,
        'owner.firstname': 1,
        'owner.lastname': 1,
        'owner.username': 1,
        'owner.brandname': 1,
        'owner.website': 1,
        'owner.image': 1,
        'owner.verified': 1,
        waitingsCount: { $size: { $ifNull: ['$waitings', []] } },
        commentsCount: { $size: { $ifNull: ['$comments', []] } },
      },
    },
  ]);

  return Task.aggregatePaginate(aggregate, paginateOptions);
}; */

/**
 * Adding link item to the list.
 * @param {String} userId
 * @param {String} linkId
 */
/* const addWaitingService = async (userId, linkId) => {
  const user = await User.findOne({ _id: mongoose.Types.ObjectId(userId) });
  const link = await Task.findOne({ _id: mongoose.Types.ObjectId(linkId) });

  let savedLink = null;

  if (user && link) {
    user.waitings.push(linkId);
    link.waitings.push(userId);

    await user.save();
    savedLink = await link.save();
  }

  if (savedLink) {
    await Task.populate(savedLink, 'owner');
    await Task.populate(savedLink, 'comments');
    await Task.populate(savedLink, 'waitings');
  }

  const savedObject = savedLink.toObject();

  savedObject.isUserWaiting = true; // Is authenticated user waiting
  savedObject.waitingsCount = savedObject.waitings.length;
  savedObject.commentsCount = savedObject.comments
    ? savedObject.comments.length
    : 0;

  delete savedObject.comments;
  delete savedObject.waitings;
  delete savedObject.owner.followings;
  delete savedObject.owner.followers;
  delete savedObject.owner.password;
  delete savedObject.owner.email;
  delete savedObject.owner.address;
  delete savedObject.owner.verificationToken;
  delete savedObject.owner.waitings;
  delete savedObject.owner.comments;
  delete savedObject.owner.links;

  return savedObject;
}; */

/**
 * Removing item from the waiting list.
 * @param {String} userId
 * @param {String} linkId
 */
/* const removeWaitingService = async (userId, linkId) => {
  const user = await User.findOne({ _id: mongoose.Types.ObjectId(userId) });
  const link = await Task.findOne({ _id: mongoose.Types.ObjectId(linkId) });

  let removedLink = null;

  if (user && link) {
    user.waitings.pull(linkId);
    link.waitings.pull(userId);
    removedLink = await link.save();
  }

  if (removedLink) {
    await Task.populate(removedLink, 'owner');
    await Task.populate(removedLink, 'comments');
    await Task.populate(removedLink, 'waitings');
  }

  const savedObject = removedLink.toObject();

  savedObject.isUserWaiting = false; // I authenticated user waiting this?
  savedObject.waitingsCount = savedObject.waitings.length;
  savedObject.commentsCount = savedObject.comments
    ? savedObject.comments.length
    : 0;

  delete savedObject.comments;
  delete savedObject.waitings;
  delete savedObject.owner.followings;
  delete savedObject.owner.followers;
  delete savedObject.owner.email;
  delete savedObject.owner.address;
  delete savedObject.owner.password;
  delete savedObject.owner.verificationToken;
  delete savedObject.owner.waitings;
  delete savedObject.owner.comments;
  delete savedObject.owner.links;

  return savedObject;
}; */

/* const linkVisitCount = async (linkId) => {
  // await Task.findByIdAndUpdate({_id: 'entityId'}, {$inc: { seq: 1} }
  await Task.findOneAndUpdate({ _id: linkId }, { $inc: { visits: 1 } });
}; */

module.exports = {
  createTaskService,
  updateTaskService,
  assignUserTaskService,
  deleteTaskService,
  getTaskByIdService,
  getTasksService,
  // getWaitingLinksService,
  // addWaitingService,
  // removeWaitingService,
  // linkVisitCount,
};
