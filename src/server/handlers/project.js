const { decode } = require('jsonwebtoken');
const { omit } = require('lodash');
const {
  createProjectService,
  updateProjectService,
  deleteLinkService,
  getProjectByIdService,
  getProjectsService,
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
