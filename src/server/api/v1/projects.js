const router = require('express').Router();
const { isAuthenticated } = require('../../middleware/auth');
const {
  projectAccessAuthorization,
  isAuthorizedToUpdate,
  isAuthorizedToNotification,
} = require('../../middleware/project');

const {
  createProjectHandler,
  updateProjectHandler,
  deleteProjectHandler,
  getProjectHandler,
  getProjectsHandler,
  accessProtectedProjectHandler,
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

const {
  createNotificationHandler,
  getNotificationsHandler,
  deleteNotificationsHandler,
} = require('../../handlers/notifications');

/**
 * Creating a new project
 */
router.post('/', isAuthenticated, createProjectHandler);

/**
 * Updating the project
 */
router.put(
  '/:id/',
  isAuthenticated,
  isAuthorizedToUpdate,
  updateProjectHandler
);

/**
 * Request to all projects user is an owner or a team member.
 */
router.get('/', isAuthenticated, getProjectsHandler);

router.get('/:projectId', projectAccessAuthorization, getProjectHandler);

/**
 * User requesting to access protected project with password
 */
router.post('/:id/protected', accessProtectedProjectHandler);

/**
 * Request to upgrade to PRO or PREMIUM
 */
router.put('/:id/upgrade', isAuthenticated, upgradeProjectHandler);

router.delete('/:id', isAuthenticated, deleteProjectHandler);

router.get('/:projectId/team', isAuthenticated, getProjectTeamHandler);

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
  isAuthenticated,
  acceptUserInvitationHandler
);

/**
 * Removing user from project groups
 */
router.delete(
  '/:projectId/groups/:groupId/invite/:id',
  isAuthenticated,
  removeUserGroupHandler
);

/**
 * Creating new task
 */
router.post('/:projectId/tasks', isAuthenticated, createTaskHandler);

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
router.post(
  `/:projectId/statuses`,
  isAuthenticated,
  createProjectStatusHandler
);

/**
 * Updating project's status
 */
router.put(
  `/:projectId/statuses/:statusId`,
  isAuthenticated,
  updateProjectStatusHandler
);

/**
 * Deleting status item
 */
router.delete(
  `/:projectId/statuses/:statusId`,
  isAuthenticated,
  deleteProjectStatusHandler
);

/**
 * Get statuses for the project.
 */
router.get(`/:projectId/statuses`, getProjectStatusesHandler);

/**
 * Assign status to a task.
 */
router.put(
  `/:projectId/tasks/:taskId/status`,
  isAuthenticated,
  updateTaskStatusHandler
);

/**
 * Unassign status from a task.
 */
router.put(
  `/:projectId/tasks/:taskId/statuses/unassign`,
  isAuthenticated,
  removeStatusFromTaskHandler
);

router.post(
  '/:projectId/notifications',
  isAuthenticated,
  createNotificationHandler
);

router.get(
  '/:projectId/notifications',
  projectAccessAuthorization,
  getNotificationsHandler
);

router.delete(
  '/:projectId/notifications/:notificationId',
  isAuthenticated,
  isAuthorizedToNotification,
  deleteNotificationsHandler
);

module.exports = router;
