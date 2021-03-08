const { decode } = require('jsonwebtoken');
const { omit } = require('lodash');
const {
  createCommentService,
  updateCommentService,
  deleteCommentService,
  getCommentService,
  getCommentsService,
} = require('../services/comments');

/**
 * Creating new comment.
 */
exports.createCommentHandler = async (req, res, next) => {
  try {
    const doc = await createCommentService(req.body);

    if (!doc) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: 'Bad Request',
        errors: {
          details: 'Failed to create comment, try again later.',
        },
      });
    }

    return res.status(201).json({
      status: 201,
      success: true,
      message: 'Link was created successfully.',
      data: doc,
    });
  } catch (error) {
    return next(error);
  }
};

/**
 * Updating existing comment.
 */
exports.updateCommentHandler = async (req, res, next) => {
  try {
    const user = decode(req.app.jwt);
    const { id } = req.params;

    if (!user) {
      return res.status(403).json({
        status: 403,
        success: false,
        message: 'Unauthorized',
        errors: {
          details: 'You are not authenticated. You need to log in.',
        },
      });
    }

    const doc = await updateCommentService(id, req.body, user._id);

    if (!doc) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: 'Bad Request',
        errors: {
          details: 'Failed to update comment, try again later.',
        },
      });
    }

    return res.status(200).json({
      status: 200,
      success: true,
      message: 'Comment was updated successfully.',
      data: doc,
    });
  } catch (error) {
    return next(error);
  }
};

exports.deleteCommentHandler = async (req, res, next) => {
  try {
    const { id } = req.params;

    const doc = await deleteCommentService(id);

    return res.status(200).json({
      status: 200,
      success: true,
      message: 'Comment was deleted successfully',
      data: doc,
    });
  } catch (error) {
    return next(error);
  }
};

exports.getCommentsHandler = async (req, res, next) => {
  try {
    const user = decode(req.app.jwt);
    const data = await getCommentsService(req.query, user ? user._id : null);

    const meta = omit(data, 'docs');
    const { docs } = data;

    return res.status(200).json({
      status: 200,
      success: true,
      data: { data: docs, meta },
    });
  } catch (error) {
    return next(error);
  }
};

exports.getCommentHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = decode(req.app.jwt);

    const doc = await getCommentService(id, user._id || null);

    return res.status(200).json({
      status: 200,
      success: true,
      data: doc,
    });
  } catch (error) {
    return next(error);
  }
};
