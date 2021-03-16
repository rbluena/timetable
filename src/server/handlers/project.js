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
  removeGroupInviteeService,
} = require('../services/project');

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
 * Removing invited users
 */
exports.removeGroupInviteeHandler = async (req, res, next) => {
  try {
    const { groupId, invitationId } = req.params;

    const data = await removeGroupInviteeService(groupId, invitationId);

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
