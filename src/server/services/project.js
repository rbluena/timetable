const mongoose = require('mongoose');
const { isEmpty } = require('lodash');
const Project = require('../models/Project');
const Group = require('../models/Group');
const User = require('../models/User');
const Task = require('../models/Task');
const Subscription = require('../models/Subscription');
const { deleteProjectGroups } = require('./group');
const { deleteProjectTasks } = require('./task');
const { deleteProjectStatuses } = require('./status');
const { sendUserInvitationEmailService } = require('./mailer');

const isProduction = process.env.NODE_ENV === 'production';

const findProjectById = async (id) =>
  Project.findById(mongoose.Types.ObjectId(id));

/**
 * Service to create new project
 *
 * @param {Object} data
 */
const createProjectService = async (data) => {
  const project = new Project({ ...data, team: [data.owner] });
  const savedProject = await project.save();

  if (savedProject) {
    // Creating new group.
    const group = new Group({
      name: 'Admins',
      description:
        'This is an example of user group you can create to categorise members of the project. Feel free to update the details of the group.',
      project: savedProject._id,
      members: [data.owner],
    });

    const savedGroup = await group.save();

    savedProject.groups.push(savedGroup._id);
    await savedProject.save();

    // Assign current project owner to admins group.
    await User.updateOne(
      { _id: mongoose.Types.ObjectId(data.owner) },
      { $push: { projects: savedProject._id, groups: savedGroup._id } }
    );
  }

  return { _id: savedProject._id };
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

  await Project.populate(updated, {
    path: 'owner',
    select: { accountName: 1, fullName: 1 },
  });

  await Project.populate(updated, {
    path: 'team',
    select: { image: 1, fullName: 1, userName: 1 },
  });

  await Project.populate(updated, 'groups');

  await Project.populate(updated, {
    path: 'groups.members',
    select: { fullName: 1, image: 1, userName: 1, email: 1 },
  });

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
  // Delete all groups related to the project, unassign users from all groups
  await deleteProjectGroups(projectId);

  // Delete all the tasks for the project.
  await deleteProjectTasks(projectId);

  // Delete all the statuses
  await deleteProjectStatuses(projectId);

  // Remove project from User model
  await User.updateMany(
    { projects: { $in: mongoose.Types.ObjectId(projectId) } },
    { $pull: { projects: mongoose.Types.ObjectId(projectId) } }
  );

  const deleted = await Project.findByIdAndDelete(
    mongoose.Types.ObjectId(projectId)
  );

  return {
    _id: deleted._doc._id,
  };
};

/**
 * Retrieving project based on ID
 * @param {String} projectId
 */
const getProjectByIdService = async (projectId) => {
  const project = await Project.findOne({
    _id: mongoose.Types.ObjectId(projectId),
  }).lean();

  await Project.populate(project, 'groups');

  await Project.populate(project, {
    path: 'groups.members',
    select: { fullName: 1, image: 1, userName: 1, email: 1 },
  });

  await Project.populate(project, {
    path: 'team',
    select: { fullName: 1, image: 1, userName: 1, email: 1 },
  });

  await Project.populate(project, {
    path: 'owner',
    select: { fullName: 1, accountName: 1, userName: 1, email: 1 },
  });

  return project;
};

const getProjectsService = async (options, userId) => {
  const match = {
    $or: [
      { owner: mongoose.Types.ObjectId(userId) },
      { team: { $in: [mongoose.Types.ObjectId(userId)] } },
    ],
  };
  const paginateOptions = { limit: 15 };
  const sort = { updatedAt: -1 };

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
        'owner.password': 0,
        'owner.verificationToken': 0,
        'owner.groups': 0,
        'owner.team': 0,
        'owner.projects': 0,
        'owner.assignedTasks': 0,
        'owner.timeEntries': 0,
        'owner.tasks': 0,
        'owner.loginStrategy': 0,
        'owner.createdAt': 0,
        'owner.updatedAt': 0,
        // isUserOwner: userId === '$owner._id'
      },
    },
  ]);

  return Project.aggregatePaginate(aggregate, paginateOptions);
};

/**
 * Upgrading project to pro.
 *
 * @param {String} projectId ID of a project
 * @param {Object} data Data for the project.
 */
const upgradeProjectService = async (projectId, data) => {
  const foundProject = await Project.findOne({
    _id: mongoose.Types.ObjectId(projectId),
    'subscription.checkoutId': data.checkoutId,
  });

  let upgradedProject = null;

  if (!foundProject) {
    upgradedProject = await Project.updateOne(
      { _id: mongoose.Types.ObjectId(projectId) },
      {
        $set: {
          subscription: {
            isTrial: false,
            checkoutId: data.checkoutId,
            maxUsers: data.users,
            isRecurring: data.isRecurring,
            subscriptionDate: data.subscriptionDate,
            expiringDate: data.expiringDate,
            subscribedTo: 'PRO',
          },
        },
      }
    );

    if (upgradedProject) {
      const subscription = new Subscription({
        checkoutId: data.checkoutId,
        isRecurring: data.isRecurring,
        email: data.customer.email,
        project: projectId,
        amount: data.amountTotal,
        subscriptionDate: data.subscriptionDate,
        expiringDate: data.expiringDate,
        subscribedTo: 'PRO',
      });

      await subscription.save();
    }
  }

  return upgradedProject;
};

const donwngradeProjectService = async (projectId) => {
  const project = Project.updateOne(
    { _id: mongoose.Types.ObjectId(projectId) },
    {
      $set: {
        maxUsers: 1,
        isRecurring: false,
        subscriptionDate: null,
        expiringDate: null,
        subscribedTo: 'FREE',
      },
    }
  );

  return project;
};

/**
 * Service to create new group for a project.
 * @param {String} projectId
 * @param {Object} groupData
 */
const createProjectGroupService = async (projectId, groupData) => {
  const group = new Group({ project: projectId, ...groupData });
  const savedGroup = await group.save();

  if (savedGroup) {
    await Project.updateOne(
      { _id: mongoose.Types.ObjectId(projectId) },
      { $push: { groups: savedGroup } }
    );
  }

  await Group.populate(savedGroup, 'members');
  return savedGroup;
};

/**
 * Updating project group.
 * @param {String} groupId
 * @param {String} data
 */
const updateProjectGroupService = async (groupId, data) => {
  const group = await Group.findOneAndUpdate(
    { _id: mongoose.Types.ObjectId(groupId) },
    { $set: { ...data } },
    { new: true }
  );

  await Group.populate(group, {
    path: 'members',
    select: { fullName: 1, userName: 1, email: 1, image: 1 },
  });

  return group;
};

/**
 * Service to delete project group.
 * @param {String} projectId
 * @param {String} groupId
 */
const deleteProjectGroupService = async (projectId, groupId) => {
  // Deleting the project
  const deleted = await Group.findOneAndDelete({
    project: mongoose.Types.ObjectId(projectId),
    _id: mongoose.Types.ObjectId(groupId),
  });

  if (deleted) {
    await Project.updateOne(
      { _id: mongoose.Types.ObjectId(projectId) },
      { $pull: { groups: mongoose.Types.ObjectId(groupId) } }
    );

    // Remove all assignments of the group from tasks.
    await Task.updateMany(
      { groupAssignees: { $in: [mongoose.Types.ObjectId(groupId)] } },
      { $pull: { groupAssignees: groupId } }
    );
  }

  return {
    _id: deleted._id,
  };
};

/**
 *
 * @param {String} projectId
 * @param {String} groupId
 * @param {String} email
 */
const acceptUserInvitationService = async (groupId, email) => {
  const user = await User.findOne({ email });

  if (user) {
    // Checking if user was already added to the project.
    const group = await Group.findOne({
      _id: mongoose.Types.ObjectId(groupId),
    }).lean();

    if (group && group.members.includes(user._id)) {
      throw Error('User with email is already a member of the project.');
    }

    await User.updateOne(
      { email },
      { $addToSet: { groups: groupId } },
      { upsert: true }
    );

    // Adding user to the group.
    await Group.updateOne(
      { _id: mongoose.Types.ObjectId(groupId) },
      { $addToSet: { members: user._id } },
      { upsert: true }
    );

    // Pulling out invitation email if any
    const updatedGroup = await Group.findOneAndUpdate(
      { _id: mongoose.Types.ObjectId(groupId) },
      { $pull: { invitees: { email } } },
      { new: true }
    );

    // Adding user to the team of the project.
    await Project.updateOne(
      { _id: mongoose.Types.ObjectId(updatedGroup.project) },
      { $addToSet: { team: user._id } },
      { upsert: true }
    );

    await Group.populate(updatedGroup, {
      path: 'members',
      select: { fullName: 1, userName: 1, email: 1, image: 1 },
    });

    return updatedGroup;
  }

  throw Error('User with email is not register. Please sign up first.');
};

/**
 * Inviting/adding user to the group.
 * if user already team member him/her to the group, else we send email
 * to the user.
 * @param {String} groupId
 * @param {Object} data
 */
const addGroupInviteeService = async (groupId, user) => {
  if (user.type === 'member') {
    // User is part of the project team, was already invited and accepted invitation.
    return acceptUserInvitationService(groupId, user.email);
  }

  // New user to be added to the group.
  const updatedGroup = await Group.findOneAndUpdate(
    {
      _id: mongoose.Types.ObjectId(groupId),
      'invitees.email': { $ne: user.email },
    },
    { $push: { invitees: { email: user.email } } },
    { new: true }
  );

  if (updatedGroup) {
    // SEND INVITATION EMAIL

    if (isProduction) {
      const project = await Project.findById(updatedGroup.project).lean();

      const request = sendUserInvitationEmailService(
        user,
        `Invitation to "${project.title}" project!`,
        {
          projectName: project.title,
          invitationLink: `https://www.asteyo.com/projects/${updatedGroup.project}/invitation/?group_id=${updatedGroup._id}&email=${user.email}`,
        }
      );

      await request;
    }

    await Group.populate(updatedGroup, {
      path: 'members',
      select: { fullName: 1, userName: 1, email: 1, image: 1 },
    });

    return updatedGroup;
  }

  throw Error('User is already invited!');
};
/**
 * Removing invitee from the group.
 * @param {String} groupId
 * @param {String} invitationId
 */
const removeUserFromGroupService = async (groupId, id, type) => {
  let updatedGroup = null;

  if (type === 'invite') {
    updatedGroup = await Group.findOneAndUpdate(
      { _id: mongoose.Types.ObjectId(groupId) },
      { $pull: { invitees: { _id: mongoose.Types.ObjectId(id) } } },
      { new: true }
    );
  } else {
    // Removed user who is an accepted member
    updatedGroup = await Group.findOneAndUpdate(
      { _id: mongoose.Types.ObjectId(groupId) },
      { $pull: { members: mongoose.Types.ObjectId(id) } },
      { new: true }
    );

    await User.updateOne(
      { _id: mongoose.Types.ObjectId(id) },
      { $pull: { groups: groupId } }
    );
  }

  if (updatedGroup) {
    await Group.populate(updatedGroup, {
      path: 'members',
      select: { fullName: 1, image: 1, userName: 1, email: 1 },
    });
  }

  return updatedGroup;
};

/**
 * Pull list of members from the team
 * @param {*} projectId
 */
const getTeamService = async (projectId) => {
  const project = await Project.findOne({
    _id: mongoose.Types.ObjectId(projectId),
  })
    .populate({
      path: 'team',
      select: ['email', 'userName', 'fullName', 'image'],
    })
    // .where({ 'team.email' : text})
    .lean();

  return project.team;
};

/**
 *
 * @param {String} projectId
 * @param {String} password
 */
const accessProtectedProjectService = async (projectId, password) => {
  const project = await Project.findOne({
    _id: mongoose.Types.ObjectId(projectId),
    'settings.access.passCode': password,
  });

  return project;
};

/**
 * Grabing all links for the user.*
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
  upgradeProjectService,
  donwngradeProjectService,
  createProjectGroupService,
  updateProjectGroupService,
  deleteProjectGroupService,
  projectVisitCount,
  addGroupInviteeService,
  acceptUserInvitationService,
  removeUserFromGroupService,
  getTeamService,
  accessProtectedProjectService,
};
