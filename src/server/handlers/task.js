const { omit } = require('lodash');
// const { getCommentsService } = require('../services/comments');
const {
  createTaskService,
  updateTaskService,
  assignUserTaskService,
  deleteTaskService,
  getTaskByIdService,
  getTasksService,
} = require('../services/task');

/**
 * Request handler for creating new project.
 */
exports.createTaskHandler = async (req, res, next) => {
  try {
    const doc = await createTaskService(req.body);

    return res.status(201).json({
      status: 201,
      success: true,
      message: 'Task was created successfully.',
      data: doc,
    });
  } catch (error) {
    return next(error);
  }
};

exports.getTaskHandler = async (req, res, next) => {
  try {
    const { taskId } = req.params;

    const doc = await getTaskByIdService(taskId);

    res.status(200).json({
      status: 200,
      success: true,
      message: '',
      data: doc,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Request handler for updating a project.
 */
exports.updateTaskHandler = async (req, res, next) => {
  try {
    const { taskId } = req.params;
    const doc = await updateTaskService(taskId, req.body);

    res.status(200).json({
      status: 200,
      success: true,
      message: 'Task was updated successfully.',
      data: doc,
    });
  } catch (error) {
    next(error);
  }
};

exports.assignTaskHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const doc = await assignUserTaskService(id, req.body);

    res.status(200).json({
      status: 200,
      success: true,
      message: 'Task was assigned successfully.',
      data: doc,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Request handler for updating a project.
 */
exports.deleteTaskHandler = async (req, res, next) => {
  try {
    const { taskId } = req.params;

    const doc = await deleteTaskService(taskId);

    res.status(200).json({
      status: 200,
      success: true,
      message: 'Task was deleted successfully.',
      data: doc,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Request handler for getting tasks.
 */
/* exports.getTaskHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const doc = await getTaskByIdService(id);

    res.status(200).json({
      status: 200,
      success: true,
      message: 'Here is the task.',
      data: doc,
    });
  } catch (error) {
    next(error);
  }
}; */

/**
 * Request handler for getting all taks.
 */
exports.getTasksHandler = async (req, res, next) => {
  try {
    const data = await getTasksService(req.query);
    const meta = omit(data, 'docs');
    const { docs } = data;

    res.status(200).json({
      status: 200,
      success: true,
      message: 'List of tasks.',
      data: { meta, data: docs },
    });
  } catch (error) {
    next(error);
  }
};

exports.getTaskCommentsHandler = async (req, res, next) => {
  try {
    const { id } = req.param;

    // const data = await getCommentsService({ task: id });
    const data = {};

    const meta = omit(data, 'docs');
    const { docs } = data;

    res.status(200).json({
      status: 200,
      success: true,
      message: 'List of tasks.',
      data: { meta, data: docs },
    });
  } catch (error) {
    next(error);
  }
};

// exports.getTaskCommentHandler = async (req, res, next) => {
//   try {
//     const {} = req.params;
//   } catch (error) {
//     next(error);
//   }
// };
