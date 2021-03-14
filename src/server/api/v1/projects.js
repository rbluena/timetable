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
} = require('../../handlers/project');

/**
 * TODO: CHECK AUTHORIZATION OF USER
 */
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

module.exports = router;
