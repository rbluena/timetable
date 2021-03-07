const mongoose = require('mongoose');
const { isEmpty } = require('lodash');
const Timer = require('../models/Timer');
const Task = require('../models/Task');
const Project = require('../models/Project');
const User = require('../models/User');
const { findUserById } = require('./user');

/**
 * Starting timer to run.
 * @param {*} data
 */
const startTimerService = async (data) => {
  const timer = new Timer(data);
  const saved = await timer.save();

  if (saved) {
    const user = await findUserById(data.user);
    user.timeEntries.push(saved._id);
    await user.save();
  }

  if (saved) {
    const task = await Task.findOne({ _id: data.task });
    task.timeEntries.push(saved._id);
    task.save();
  }

  return saved;
};

/**
 * Stoping timer from running.
 * @param {String} timerId
 * @param {Object} data
 */
const stopTimerService = async (timerId, data) => {
  const doc = await Timer.findOne({ _id: timerId });

  doc.end = data.end;
  doc.duration = data.duration;

  const saved = await doc.save();

  if (!saved) {
    throw Error('Something went wrong. Our team are fixing it');
  }

  return saved.toObject();
};

/**
 * Updating time entry.
 * @param {*} timerId
 * @param {*} data
 */
const updateTimerService = async (timerId, data) => {
  const doc = await Timer.findOne({ _id: timerId });

  if (!isEmpty(data)) {
    Object.keys(data).forEach((key) => {
      doc[key] = data[key];
    });
  }

  const updated = doc.save();

  if (!updated) {
    throw Error('Something went wrong. Our team are fixing it');
  }

  return updated;
};

/**
 * Service to retrieve time entries.
 * @param {Object} options
 */
const getTimeEntriesService = async (options) => {
  const match = { deleted: false };
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

  if (options.user) {
    match.user = mongoose.Types.ObjectId(options.user);
  }

  if (options.task) {
    match.task = mongoose.Types.ObjectId(options.task);
  }

  const aggregate = Timer.aggregate([
    { $match: match },
    { $sort: sort },
    {
      $lookup: {
        from: User.collection.name,
        localField: 'user',
        foreignField: '_id',
        as: 'user',
      },
    },
    {
      $lookup: {
        from: Task.collection.name,
        localField: 'task',
        foreignField: '_id',
        as: 'task',
      },
    },
    {
      $lookup: {
        from: Project.collection.name,
        localField: 'project',
        foreignField: '_id',
        as: 'project',
      },
    },
    { $unwind: '$user' },
    { $unwind: '$task' },
    { $unwind: '$project' },
  ]);

  return Timer.aggregatePaginate(aggregate, paginateOptions);
};

/**
 * Deleting time entry.
 * @param {String} timerId
 */
const deleteTimeEntryService = async (timerId) => {
  const deleted = await Timer.findOneAndDelete({ _id: timerId });

  return {
    _id: deleted._doc._id,
  };
};

module.exports = {
  startTimerService,
  stopTimerService,
  updateTimerService,
  deleteTimeEntryService,
  getTimeEntriesService,
};
