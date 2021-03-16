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
// router.post('/:projectId/groups/:groupId/assign');
// router.delete('/:projectId/groups/:groupId/assign/:userId');

module.exports = router;
