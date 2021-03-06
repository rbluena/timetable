const router = require('express').Router();
const { isAuthenticated, isAuthorized } = require('../../middleware/auth');
const { validateProjectData } = require('../../middleware/project');
const {
  createProjectHandler,
  updateProjectHandler,
  deleteProjectHandler,
  getProjectHandler,
  getProjectsHandler,
} = require('../../handlers/project');

router.post(
  '/create',
  isAuthenticated,
  validateProjectData,
  createProjectHandler
);

// router.put('/:id/', isAuthenticated, isAuthorized, updateProjectHandler);
/**
 * TODO: CHECK AUTHORIZATION OF USER
 */
router.put('/:id/', isAuthenticated, updateProjectHandler);
router.delete('/:id', isAuthenticated, isAuthorized, deleteProjectHandler);
router.get('/', getProjectsHandler);
router.get('/:id', getProjectHandler);

module.exports = router;
