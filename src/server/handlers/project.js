const { decode } = require('jsonwebtoken');
const { add } = require('date-fns');
const Stripe = require('stripe');
const { omit } = require('lodash');
const {
  createProjectService,
  updateProjectService,
  deleteLinkService,
  getProjectByIdService,
  getProjectsService,
  upgradeProjectService,
  createProjectGroupService,
  updateProjectGroupService,
  deleteProjectGroupService,
  addGroupInviteeService,
  acceptUserInvitationService,
  removeUserFromGroupService,
} = require('../services/project');

const {
  getProjectStatusesService,
  createStatusService,
  updateStatusService,
  deleteStatusService,
  movingTaskOnBoardService,
} = require('../services/status');

const {
  getProjectTasksService,
  getProjectTasksByStatusService,
  assignStatusToTaskService,
  removeStatusFromTaskService,
} = require('../services/task');

/**
 * Request handler for creating new project.
 */
exports.createProjectHandler = async (req, res, next) => {
  try {
    const doc = await createProjectService(req.body);

    return res.status(201).json({
      status: 201,
      success: true,
      message: 'Project was created successfully.',
      data: doc,
    });
  } catch (error) {
    return next(error);
  }
};

/**
 * Request handler for updating a project.
 */
exports.updateProjectHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const doc = await updateProjectService(id, req.body);

    res.status(200).json({
      status: 200,
      success: true,
      message: 'Project was updated successfully.',
      data: doc,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Request handler for updating a project.
 */
exports.deleteProjectHandler = async (req, res, next) => {
  try {
    const { id } = req.params;

    const doc = await deleteLinkService(id);

    res.status(200).json({
      status: 200,
      success: true,
      message: 'Project was deleted successfully.',
      data: { ...doc },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Request handler for getting project
 */
exports.getProjectHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = decode(req.app.jwt);
    const doc = await getProjectByIdService(id, user && user._id);

    if (user && String(user._id) === String(doc.owner._id)) {
      doc.isUserOwner = true;
    } else {
      doc.visits += doc.visits;
    }

    res.status(200).json({
      status: 200,
      success: true,
      message: 'Here is the link.',
      data: doc,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Request handler for getting all projects.
 */
exports.getProjectsHandler = async (req, res, next) => {
  try {
    const data = await getProjectsService(req.query, null);
    const meta = omit(data, 'docs');
    const { docs } = data;

    res.status(200).json({
      status: 200,
      success: true,
      message: 'List of projects.',
      data: { meta, data: docs },
    });
  } catch (error) {
    next(error);
  }
};

exports.upgradeProjectHandler = async (req, res, next) => {
  try {
    const { id: projectId } = req.params;
    const { stripeSessionId, stripePriceId } = req.body;

    let project = null;

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2020-08-27',
    });

    const session = await stripe.checkout.sessions.retrieve(stripeSessionId);
    const price = await stripe.prices.retrieve(stripePriceId);

    if (session && session.payment_status === 'paid') {
      project = await upgradeProjectService(projectId, {
        checkoutId: session.id,
        customer: session.customer_details,
        amountTotal: session.amount_total,
        users: session.amount_total / price.unit_amount,
        isRecurring: session.mode === 'subscription',
        subscriptionDate: Date.now(),
        expiringDate:
          session.mode === 'subscription'
            ? add(Date.now(), { month: 1 })
            : add(Date.now(), { week: 1 }),
      });
    }

    return res.status(200).json({
      status: 200,
      success: true,
      message: '',
      data: { data: project },
    });
  } catch (error) {
    return next(error);
  }
};

/**
 * Request handler for getting all projects.
 */
exports.createProjectGroupHandler = async (req, res, next) => {
  try {
    const { projectId } = req.params;

    const data = await createProjectGroupService(projectId, req.body);

    res.status(201).json({
      status: 201,
      success: true,
      message: 'Project group was created successfully.',
      data,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Update project.
 */
exports.updateProjectGroupHandler = async (req, res, next) => {
  try {
    const { groupId } = req.params;
    const data = await updateProjectGroupService(groupId, req.body);

    res.status(200).json({
      status: 200,
      success: true,
      message: 'Project group was updated successfully.',
      data,
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteProjectGroupHandler = async (req, res, next) => {
  try {
    const { projectId, groupId } = req.params;

    const data = await deleteProjectGroupService(projectId, groupId);

    res.status(200).json({
      status: 200,
      success: true,
      message: 'Project group was deleted successfully.',
      data,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Inviting users to the group
 */
exports.addGroupInviteeHandler = async (req, res, next) => {
  try {
    const { groupId } = req.params;

    const data = await addGroupInviteeService(groupId, req.body);

    res.status(200).json({
      status: 200,
      success: true,
      message: 'User was invited to join the group successfully.',
      data,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * User accepting invitation.
 */
exports.acceptUserInvitationHandler = async (req, res, next) => {
  try {
    const { projectId, groupId } = req.params;
    const { email } = req.body;

    const { data, meta } = await acceptUserInvitationService(
      projectId,
      groupId,
      email
    );

    res.status(200).json({
      status: 200,
      success: true,
      message: 'User was invited to join the group successfully.',
      data,
      meta,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Removing invited users
 */
exports.removeUserGroupHandler = async (req, res, next) => {
  try {
    const { groupId, id } = req.params;
    const { type } = req.query;

    const data = await removeUserFromGroupService(groupId, id, type);

    res.status(200).json({
      status: 200,
      success: true,
      message: 'User was invited to join the group successfully.',
      data,
    });
  } catch (error) {
    next(error);
  }
};

exports.getProjectStatusesHandler = async (req, res, next) => {
  try {
    const { projectId } = req.params;

    const data = await getProjectStatusesService(projectId);

    res.status(200).json({
      status: 200,
      success: true,
      message: '',
      data,
    });
  } catch (error) {
    next(error);
  }
};

exports.getProjectTasksHandler = async (req, res, next) => {
  try {
    const { projectId } = req.params;
    const { query } = req;
    const newQuery = {};

    Object.keys(query).forEach((key) => {
      if (query[key] === 'null') {
        newQuery[key] = null;
      } else {
        newQuery[key] = query[key];
      }
    });

    const data = await getProjectTasksService(projectId, newQuery);
    const meta = omit(data, 'docs');

    res.status(200).json({
      status: 200,
      success: true,
      message: '',
      data: data.docs,
      meta,
    });
  } catch (error) {
    next(error);
  }
};

exports.getProjectTasksByStatusHandler = async (req, res, next) => {
  try {
    const { projectId } = req.params;
    const query = req.query || {};

    const data = await getProjectTasksByStatusService(projectId, query);
    const meta = omit(data, 'docs');

    res.status(200).json({
      status: 200,
      success: true,
      message: '',
      data: data.docs,
      meta,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Handler to create a status for a project
 */
exports.createProjectStatusHandler = async (req, res, next) => {
  try {
    const data = await createStatusService(req.body);

    res.status(200).json({
      status: 200,
      success: true,
      message: 'Status was created successfully!',
      data,
    });
  } catch (error) {
    next(error);
  }
};

exports.updateProjectStatusHandler = async (req, res, next) => {
  try {
    const { statusId } = req.params;

    const data = await updateStatusService(statusId, req.body);

    res.status(200).json({
      status: 200,
      success: true,
      message: 'Status was updated successfully!',
      data,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Handler to delete project status.
 */
exports.deleteProjectStatusHandler = async (req, res, next) => {
  try {
    const { statusId } = req.params;

    const data = await deleteStatusService(statusId, req.body);

    res.status(200).json({
      status: 200,
      success: true,
      message: 'Status was deleted successfully!',
      data,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Updating task status when task moved within a board.
 */
exports.updateTaskStatusHandler = async (req, res, next) => {
  try {
    const { taskId } = req.params;
    const data = await movingTaskOnBoardService(taskId, req.body);

    res.status(200).json({
      status: 200,
      success: true,
      message: 'Task was assign status successfully!',
      data,
    });
  } catch (error) {
    next(error);
  }
};

exports.assignStatusToTaskHandler = async (req, res, next) => {
  try {
    const { statusId, taskId } = req.params;

    const data = await assignStatusToTaskService(statusId, taskId);

    res.status(200).json({
      status: 200,
      success: true,
      message: '',
      data,
    });
  } catch (error) {
    next(error);
  }
};

exports.removeStatusFromTaskHandler = async (req, res, next) => {
  try {
    const { statusId, taskId } = req.params;

    const data = await removeStatusFromTaskService(statusId, taskId);

    res.status(200).json({
      status: 200,
      success: true,
      message: '',
      data,
    });
  } catch (error) {
    next(error);
  }
};
