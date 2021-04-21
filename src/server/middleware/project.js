const { decode } = require('jsonwebtoken');
const { get } = require('lodash');
const Project = require('../models/Project');
const Notification = require('../models/Notification');

/**
 * Validating data comming from the client
 *
 */
exports.validateProjectData = (req, res, next) => {
  try {
    const { title, owner } = req.body;

    if (!title || title.length === 0) {
      return res.status(400).json({
        status: 400,
        message: 'error',
        errors: [
          {
            details:
              'Title of the project is missing. Title should be provided.',
          },
        ],
      });
    }

    if (!owner || owner.length === 0) {
      return res.status(400).json({
        status: 400,
        message: 'error',
        errors: [
          {
            details: 'Owner should be specified.',
          },
        ],
      });
    }

    return next();
  } catch (error) {
    return next(error);
  }
};

exports.isAuthorizedToUpdate = async (req, res, next) => {
  try {
    const user = decode(req.app.jwt);

    const { id: projectId } = req.params;
    const project = await Project.findById(projectId);

    if (String(user._id) === String(project.owner)) {
      next();
      return;
    }

    res.status(403).json({
      status: 403,
      message: 'Unauthorized',
      errors: {
        details: 'You are not allowed to perform this operation.',
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.isAuthorizedToNotification = async (req, res, next) => {
  try {
    const user = decode(req.app.jwt);

    const { projectId, notificationId } = req.params;
    const project = await Project.findById(projectId);
    const notification = await Notification.findById(notificationId);

    console.log(notification);
    console.log(project);

    if (!project || !notification) {
      res.status(404).json({
        status: 404,
        message: 'Not Found!',
        errors: {
          details: 'This resource was not found.',
        },
      });
      return;
    }

    const isUserAuthorized =
      String(notification.creator._id) === String(user._id) ||
      String(user._id) === String(project.owner);

    if (!isUserAuthorized) {
      res.status(403).json({
        status: 403,
        message: 'Unauthorized',
        errors: {
          details: 'You are not allowed to perform this operation.',
        },
      });

      return;
    }

    next();
  } catch (error) {
    next(error);
  }
};

exports.projectAccessAuthorization = async (req, res, next) => {
  try {
    const { projectId } = req.params;
    const project = await Project.findById(projectId);

    if (project) {
      const access = get(project, 'settings.access');
      const { type: accessType } = access;

      if (accessType === 'public') {
        next();
        return;
      }

      if (accessType === 'protected') {
        if (req.app.authorizedProtectedProject === String(projectId)) {
          next();
          return;
        }

        // If user is authenticated and is the owner or team member,
        // can be able to view the project.
        if (req.app.jwt) {
          const user = decode(req.app.jwt);

          if (
            String(project.owner) === String(user._id) ||
            project.team.includes(String(user._id))
          ) {
            next();
            return;
          }
        }

        req.app.authorizedProtectedProject = null;
        res.set('x-project-access-authorized', false);

        res.status(403).json({
          status: 403,
          success: false,
          message: 'error',
          protectedProjectAccess: false,
          errors: {
            description: 'You are not authorized to access the resource.',
          },
        });

        return;
      }

      if (accessType === 'private') {
        if (req.app.jwt) {
          const user = decode(req.app.jwt);

          if (
            String(project.owner) === String(user._id) ||
            project.team.includes(String(user._id))
          ) {
            next();
            return;
          }
        }
      }
    }

    res.status(403).json({
      status: 403,
      success: false,
      message: 'Unauthorized',
      errors: { description: 'You are not authorized to view the project!' },
    });
  } catch (error) {
    next(error);
  }
};
