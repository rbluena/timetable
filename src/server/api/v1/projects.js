const router = require('express').Router();
const { isAuthenticated } = require('../../middleware/auth');
const { isAuthorizedToUpdate } = require('../../middleware/project');

const {
  createProjectHandler,
  updateProjectHandler,
  deleteProjectHandler,
  getProjectHandler,
  getProjectsHandler,
  upgradeProjectHandler,
  getProjectTeamHandler,
  createProjectGroupHandler,
  updateProjectGroupHandler,
  deleteProjectGroupHandler,
  addGroupInviteeHandler,
  acceptUserInvitationHandler,
  removeUserGroupHandler,
  getProjectTasksHandler,
  createProjectStatusHandler,
  updateProjectStatusHandler,
  deleteProjectStatusHandler,
  getProjectStatusesHandler,
  getProjectTasksByStatusHandler,
  updateTaskStatusHandler,
  removeStatusFromTaskHandler,
} = require('../../handlers/project');

const { createTaskHandler, getTaskHandler } = require('../../handlers/task');

// router.put('/:id/', isAuthenticated, isAuthorized, updateProjectHandler);
router.post('/', isAuthenticated, createProjectHandler);

router.put(
  '/:id/',
  isAuthenticated,
  isAuthorizedToUpdate,
  updateProjectHandler
);

/**
 * API to delete project.
 */
router.get('/', isAuthenticated, getProjectsHandler);

router.get('/:id', getProjectHandler);

router.put('/:id/upgrade', upgradeProjectHandler);

router.delete('/:id', isAuthenticated, deleteProjectHandler);

router.get('/:projectId/team', getProjectTeamHandler);

router.post('/:projectId/groups', isAuthenticated, createProjectGroupHandler);

router.put(
  '/:projectId/groups/:groupId',
  isAuthenticated,
  updateProjectGroupHandler
);

router.delete(
  '/:projectId/groups/:groupId',
  isAuthenticated,
  deleteProjectGroupHandler
);

router.post(
  '/:projectId/groups/:groupId/adduser',
  isAuthenticated,
  addGroupInviteeHandler
);

/**
 * User accepting to be added to a project group.
 */
router.put(
  '/:projectId/groups/:groupId/adduser',
  // isAuthenticated,
  acceptUserInvitationHandler
);

router.delete(
  '/:projectId/groups/:groupId/invite/:id',
  isAuthenticated,
  removeUserGroupHandler
);
// router.delete('/:projectId/groups/:groupId/assign/:userId');

/**
 * Creating new task
 */
router.post('/:projectId/tasks', createTaskHandler);

/**
 * Get tasks for a project.
 */
router.get(`/:projectId/tasks`, getProjectTasksHandler);

/**
 * Get a task for a project.
 */
router.get(`/:projectId/tasks/:taskId`, getTaskHandler);

/**
 * Get tasks by status.
 */
router.get(`/:projectId/tasks/statuses`, getProjectTasksByStatusHandler);

/**
 * Creating project's status
 */
router.post(`/:projectId/statuses`, createProjectStatusHandler);

/**
 * Updating project's status
 */
router.put(`/:projectId/statuses/:statusId`, updateProjectStatusHandler);

/**
 * Deleting status item
 */
router.delete(`/:projectId/statuses/:statusId`, deleteProjectStatusHandler);

/**
 * Get statuses for the project.
 */
router.get(`/:projectId/statuses`, getProjectStatusesHandler);

/**
 * Assign status to a task.
 */
router.put(`/:projectId/tasks/:taskId/status`, updateTaskStatusHandler);

/**
 * Unassign status from a task.
 */
router.put(
  `/:projectId/tasks/:taskId/statuses/unassign`,
  removeStatusFromTaskHandler
);

module.exports = router;
