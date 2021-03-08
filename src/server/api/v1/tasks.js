const router = require('express').Router();
const { isAuthenticated } = require('../../middleware/auth');
// const { validateLinkData } = require('../../middleware/task');
const {
  createTaskHandler,
  updateTaskHandler,
  assignTaskHandler,
  deleteTaskHandler,
  getTaskHandler,
  getTasksHandler,
} = require('../../handlers/task');

router.post('/create', isAuthenticated, createTaskHandler);
router.put('/:id/', isAuthenticated, updateTaskHandler);
router.put('/:id/assign', isAuthenticated, assignTaskHandler);
router.delete('/:id', isAuthenticated, deleteTaskHandler);
router.get('/', getTasksHandler);
router.get('/:id', getTaskHandler);

module.exports = router;
