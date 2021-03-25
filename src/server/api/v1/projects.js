const router = require('express').Router();
const { isAuthenticated, isAuthorized } = require('../../middleware/auth');
const { isAuthorizedToUpdate } = require('../../middleware/project');

const {
  createProjectHandler,
  updateProjectHandler,
  deleteProjectHandler,
  getProjectHandler,
  getProjectsHandler,
  upgradeProjectHandler,
  createProjectGroupHandler,
  updateProjectGroupHandler,
  deleteProjectGroupHandler,
  addGroupInviteeHandler,
  acceptUserInvitationHandler,
  removeUserGroupHandler,
  getProjectTasksHandler,
  getProjectStatusesHandler,
  getProjectTasksByStatusHandler,
  assignStatusToTaskHandler,
  removeStatusFromTaskHandler,
} = require('../../handlers/project');

// router.put('/:id/', isAuthenticated, isAuthorized, updateProjectHandler);
router.post('/', isAuthenticated, createProjectHandler);
router.put(
  '/:id/',
  isAuthenticated,
  isAuthorizedToUpdate,
  updateProjectHandler
);
router.delete('/:id', isAuthenticated, isAuthorized, deleteProjectHandler);
router.put('/:id/upgrade', upgradeProjectHandler);
router.get('/', isAuthenticated, getProjectsHandler);
router.get('/:id', getProjectHandler);

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
 * Get tasks for a project.
 */
router.get(`/:projectId/tasks`, getProjectTasksHandler);

/**
 * Get tasks by status.
 */
router.get(`/:projectId/tasks/statuses`, getProjectTasksByStatusHandler);

/**
 * Get statuses for the project.
 */
router.get(`/:projectId/statuses`, getProjectStatusesHandler);

/**
 * Assign status to a task.
 */
router.put(
  `/:projectId/tasks/:taskId/statuses/:statusId`,
  assignStatusToTaskHandler
);

/**
 * Unassign status from a task.
 */
router.put(
  `/:projectId/tasks/:taskId/statuses/unassign`,
  removeStatusFromTaskHandler
);

module.exports = router;
