const mongoose = require('mongoose');
const { uniq } = require('lodash');
const Task = require('../models/Task');
const Project = require('../models/Project');
const Group = require('../models/Group');
const User = require('../models/User');
const Status = require('../models/Status');
// const { findUserById } = require('./user');

/**
 * Service to create new task.
 * @param {Object} data
 */
const createTaskService = async (data) => {
  // Group assigned to this task.
  const groupAssignees = data.assignees
    ? data.assignees
        .filter((item) => item.type === 'group')
        .map((item) => mongoose.Types.ObjectId(item._id))
    : [];

  // User assigned to this task
  const userAssignees = data.assignees
    ? data.assignees
        .filter((item) => item.type === 'user')
        .map((item) => mongoose.Types.ObjectId(item._id))
    : [];

  const newData = { ...data, groupAssignees, userAssignees };

  const task = new Task(newData);
  const saved = await task.save();

  if (saved) {
    if (userAssignees && userAssignees.length) {
      await User.updateMany(
        { _id: { $in: userAssignees } },
        { $push: { assignedTasks: saved._id } }
      );
    }

    if (groupAssignees && groupAssignees.length > 0) {
      await Group.updateMany(
        { _id: { $in: groupAssignees } },
        { $push: { assignedTasks: saved._id } }
      );
    }

    await Project.updateOne(
      { _id: mongoose.Types.ObjectId(data.project) },
      { $push: { tasks: saved._id } }
    );
  }

  await Task.populate(saved, 'todos');

  return saved;
};

/**
 * Service to update existing task
 * @param {String} taskId
 * @param {Object} data
 */
const updateTaskService = async (taskId, data) => {
  const doc = await Task.findOne({ _id: mongoose.Types.ObjectId(taskId) });

  // Deleting _id property to avoid warning from mongodb
  delete data._id;

  if (data.assignees) {
    // Group assigned to this task.
    data.groupAssignees = data.assignees
      ? data.assignees
          .filter((item) => item.type === 'group')
          .map((item) => mongoose.Types.ObjectId(item._id))
      : [];

    // User assigned to this task
    data.userAssignees = data.assignees
      ? data.assignees
          .filter((item) => item.type === 'user')
          .map((item) => mongoose.Types.ObjectId(item._id))
      : [];

    delete data.assignees;
  }

  // In case reporter is unassigned
  if (!data.reporter) {
    data.reporter = null;
  }

  Object.keys(data).forEach((key) => {
    doc[key] = data[key];
  });

  const updated = await doc.save();

  if (!updated) {
    throw Error('Something went wrong. Our team are fixing it');
  }

  await Task.populate(updated, 'todos');

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
  const deleted = await Task.findOneAndDelete({
    _id: mongoose.Types.ObjectId(taskId),
  });

  if (deleted) {
    // Assign tasks to the group.
    await User.updateMany(
      { assignedTasks: { $in: mongoose.Types.ObjectId(taskId) } },
      {
        $pull: { assignedTasks: taskId },
      }
    );

    // Unassign tasks from the Group.
    await Group.updateMany(
      { assignedTasks: { $in: mongoose.Types.ObjectId(taskId) } },
      {
        $pull: { assignedTasks: taskId },
      }
    );
  }

  return {
    _id: deleted._id,
  };
};

/**
 * Retrieving task based on task id
 * @param {String} taskId
 */
const getTaskByIdService = async (taskId) => {
  const task = await Task.findOne({
    _id: mongoose.Types.ObjectId(taskId),
  })
    .populate('status groupAssignees')
    .populate({
      path: 'userAssignees reporter',
      select: ['fullName', 'accountName', 'image'],
    })
    .lean();

  return task;
};

/**
 * Retreiving task for a particular project.
 * @param {String} projectId
 * @param {Object} options
 */
const getProjectTasksService = async (projectId, options) => {
  const match = { project: mongoose.Types.ObjectId(projectId) };
  const paginateOptions = { limit: 15 };
  // const paginateOptions = { limit: 4 };
  let sort = { date: 1 };

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

  if (options.reporter) {
    match.reporter = mongoose.Types.ObjectId(options.reporter);
  }

  if (options.category) {
    match.category = mongoose.Types.ObjectId(options.category);
  }

  if (options.status) {
    if (options.status === 'null') {
      match.status = null;
    } else {
      match.status = options.status;
    }
  }

  if (options.from) {
    match.date = { $gte: new Date(options.from) };
  }

  if (options.to) {
    match.date = { $lte: options.to };
  }

  const aggregate = Task.aggregate([
    { $sort: sort },
    { $match: match },
    // {
    //   $lookup: {
    //     from: User.collection.name,
    //     localField: 'reporter',
    //     foreignField: '_id',
    //     as: 'reporter',
    //   },
    // },
    // {
    //   $lookup: {
    //     from: User.collection.name,
    //     localField: 'userAssignees',
    //     foreignField: '_id',
    //     as: 'userAssignees',
    //   },
    // },
    // {
    //   $lookup: {
    //     from: Group.collection.name,
    //     localField: 'groupAssignees',
    //     foreignField: '_id',
    //     as: 'groupAssignees',
    //   },
    // },
    // { $unwind: '$reporter' },
    /*  {
      $project: {
        'reporter.email': 0,
        'reporter.password': 0,
        'reporter.groups': 0,
        'reporter.projects': 0,
        'reporter.tasks': 0,
        'reporter.verificationToken': 0,
        'reporter.loginStrategy': 0,
        'reporter.assignedTasks': 0,
        'reporter.createdAt': 0,
        'reporter.updatedAt': 0,
        'userAssignees.email': 0,
        'userAssignees.password': 0,
        'userAssignees.groups': 0,
        'userAssignees.projects': 0,
        'userAssignees.tasks': 0,
        'userAssignees.verificationToken': 0,
        'userAssignees.loginStrategy': 0,
        'userAssignees.assignedTasks': 0,
        'userAssignees.createdAt': 0,
        'userAssignees.updatedAt': 0,
        'groupAssignees.invitees': 0,
        'groupAssignees.assignedTasks': 0,
        'groupAssignees.members': 0,
      },
    }, */
  ]);

  return Task.aggregatePaginate(aggregate, paginateOptions);
};

const getProjectTasksByStatusService = async (projectId) => {
  const tasks = Status.find(
    {
      project: mongoose.Types.ObjectId(projectId),
    },
    { tasks: { $slice: [0, 15] } }
  )
    .populate('tasks')
    .lean();

  return tasks;
};

const assignStatusToTaskService = async (statusId, taskId) => {
  await Status.updateOne(
    { _id: mongoose.Types.ObjectId(statusId) },
    { $push: { tasks: taskId } },
    { upsert: true }
  );

  const updatedTask = await Task.updateOne(
    { _id: mongoose.Types.ObjectId(taskId) },
    { status: statusId }
  )
    .populate('status')
    .lean();

  return updatedTask;
};

const removeStatusFromTaskService = async (statusId, taskId) => {
  await Status.updateOne(
    { _id: mongoose.Types.ObjectId(statusId) },
    { $pull: { tasks: taskId } }
  );

  const updatedTask = await Task.updateOne(
    { _id: mongoose.Types.ObjectId(taskId) },
    { status: null }
  )
    .populate('status')
    .lean();

  return updatedTask;
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

  if (options.status) {
    match.status = mongoose.Types.ObjectId(options.status);
  }

  const aggregate = Task.aggregate([
    { $match: match },
    { $sort: sort },
    {
      $lookup: {
        from: User.collection.name,
        localField: 'reporter',
        foreignField: '_id',
        as: 'reporter',
      },
    },
    { $unwind: '$reporter' },
    {
      $project: {
        'reporter.email': 0,
        'reporter.password': 0,
        'reporter.groups': 0,
        'reporter.projects': 0,
        'reporter.tasks': 0,
        'reporter.verifcationToken': 0,
        'reporter.assignedTasks': 0,
      },
    },
  ]);

  return Task.aggregatePaginate(aggregate, paginateOptions);
};

/**
 * Deleting project.
 * @param {String} projectId ID of the project
 */
const deleteProjectTasks = async (projectId) => {
  const tasks = await Task.find({ project: mongoose.Types.ObjectId(projectId) })
    .select(['_id'])
    .lean();

  tasks.forEach(async (task) => {
    await User.updateMany(
      { tasks: { $in: [task._id] } },
      { $pull: { tasks: task._id } }
    );
  });

  const deleted = await Task.deleteMany({
    project: mongoose.Types.ObjectId(projectId),
  });

  return deleted;
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
  getProjectTasksService,
  getProjectTasksByStatusService,
  assignStatusToTaskService,
  removeStatusFromTaskService,
  deleteProjectTasks,
  // getWaitingLinksService,
  // addWaitingService,
  // removeWaitingService,
  // linkVisitCount,
};
