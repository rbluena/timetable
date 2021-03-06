const mongoose = require('mongoose');
const { isEmpty } = require('lodash');
const Project = require('../models/Project');
const User = require('../models/User');
const { findUserById } = require('./user');

const findProjectById = async (id) =>
  Project.findById(mongoose.Types.ObjectId(id));

/**
 * Service to create new project
 *
 * @param {Object} data
 */
const createProjectService = async (data) => {
  const project = new Project(data);
  const saveProject = await project.save();

  if (saveProject) {
    const user = await findUserById(data.owner);
    user.projects.push(saveProject._id);
    await user.save();
  }

  return saveProject;
};

/**
 * Service to update existing project
 *
 * @param {String} todoId
 * @param {Object} data
 */
const updateProjectService = async (projectId, data) => {
  const doc = await Project.findOne({ _id: projectId });

  if (!isEmpty(data)) {
    Object.keys(data).forEach((key) => {
      doc[key] = data[key];
    });
  }

  const updated = await doc.save();

  if (!updated) {
    throw Error('Something went wrong. Our team are fixing it');
  }

  // await Project.populate(updated, 'owner');
  // await Project.populate(updated, 'comments');
  // await Project.populate(updated, 'waitings');

  const updatedObj = updated.toObject();
  // updatedObj.isUserWaiting = false;
  // updatedObj.isUserOwner = true;
  // updatedObj.waitingsCount = updatedObj.waitings.length;
  // updatedObj.commentsCount = updatedObj.comments
  //   ? updatedObj.comments.length
  //   : 0;

  return updatedObj;
};

/**
 * Deleting project based on id.
 * @param {String} projectId
 */
const deleteProjectService = async (projectId) => {
  const doc = await Project.findOne({ _id: projectId });

  doc.deleted = true;
  const deleted = doc.save();

  return {
    id: deleted._doc._id,
  };
};

/**
 * Retrieving project based on ID
 * @param {String} projectId
 */
const getProjectByIdService = async (projectId) => {
  const project = await Project.findOne(
    { _id: mongoose.Types.ObjectId(projectId) },
    {
      _id: 1,
      title: 1,
      description: 1,
      isPrivate: 1,
      startDate: 1,
      endDate: 1,
      owner: 1,
      groups: 1,
    }
  ).lean();

  return project;
};

const getProjectsService = async (options) => {
  const match = {};
  const paginateOptions = { limit: 15 };
  const sort = { createdAt: -1 };

  if (!isEmpty(options)) {
    Object.keys(options).forEach((key) => {
      if (key === 'page') {
        paginateOptions.page = options[key];
      } else if (key === 'owner') {
        match.owner = mongoose.Types.ObjectId(options.owner);
      } else {
        match[key] = options[key];
      }
    });
  }

  const aggregate = Project.aggregate([{ $match: match }, { $sort: sort }]);

  return Project.aggregatePaginate(aggregate, paginateOptions);
};

/**
 * Grabing all links for the user.
 * @param {Object} options
 */
/* const getAllLinksService = async (options, userId) => {
  const match = {};
  const paginateOptions = { limit: 15 };
  let sort = { createdAt: -1 };

  const { limit, page, topic, category, sort: sortQuery } = options;

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

  if (options.owner) {
    match.owner = mongoose.Types.ObjectId(options.owner);
  }

  if (category) {
    match.category = { $in: [category] };
  }

  if (topic) {
    match.topic = { $in: [topic] };
  }

  const aggregate = Project.aggregate([
    { $match: match },
    { $sort: sort },
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

  return Project.aggregatePaginate(aggregate, paginateOptions);
}; */

/**
 * Retrieving waitings from the list.
 * @param {String} userId
 */
/* const getWaitingLinksService = async (userId, options = {}) => {
  const paginateOptions = { limit: 15 };
  const { limit, page } = options;

  // const waitings = await Project.find({
  //   waitings: { $in: [mongoose.Types.ObjectId(userId)] },
  // }).populate('owner', 'firstname lastname username brandname prominent');

  if (page) {
    paginateOptions.page = parseInt(page, 10);
  }

  if (limit) {
    paginateOptions.limit = parseInt(limit, 10);
  }

  const aggregate = Project.aggregate([
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

  return Project.aggregatePaginate(aggregate, paginateOptions);
}; */

/**
 * Adding link item to the list.
 * @param {String} userId
 * @param {String} linkId
 */
/* const addWaitingService = async (userId, linkId) => {
  const user = await User.findOne({ _id: mongoose.Types.ObjectId(userId) });
  const link = await Project.findOne({ _id: mongoose.Types.ObjectId(linkId) });

  let savedLink = null;

  if (user && link) {
    user.waitings.push(linkId);
    link.waitings.push(userId);

    await user.save();
    savedLink = await link.save();
  }

  if (savedLink) {
    await Project.populate(savedLink, 'owner');
    await Project.populate(savedLink, 'comments');
    await Project.populate(savedLink, 'waitings');
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
  const link = await Project.findOne({ _id: mongoose.Types.ObjectId(linkId) });

  let removedLink = null;

  if (user && link) {
    user.waitings.pull(linkId);
    link.waitings.pull(userId);
    removedLink = await link.save();
  }

  if (removedLink) {
    await Project.populate(removedLink, 'owner');
    await Project.populate(removedLink, 'comments');
    await Project.populate(removedLink, 'waitings');
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

const projectVisitCount = async (linkId) => {
  // await Project.findByIdAndUpdate({_id: 'entityId'}, {$inc: { seq: 1} }
  await Project.findOneAndUpdate({ _id: linkId }, { $inc: { visits: 1 } });
};

module.exports = {
  findProjectById,
  createProjectService,
  updateProjectService,
  deleteProjectService,
  getProjectByIdService,
  getProjectsService,
  // getWaitingLinksService,
  // addWaitingService,
  // removeWaitingService,
  projectVisitCount,
};
