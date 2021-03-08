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
  getTaskCommentsHandler,
  updateTaskCommentHandler,
  deleteTaskCommentHandler,
} = require('../../handlers/task');

router.post('/', isAuthenticated, createTaskHandler);
router.put('/:id/', isAuthenticated, updateTaskHandler);
router.put('/:id/assign', isAuthenticated, assignTaskHandler);
router.delete('/:id', isAuthenticated, deleteTaskHandler);
router.get('/', getTasksHandler);
router.get('/:id', getTaskHandler);
router.get('/:id/comments', getTaskCommentsHandler);
router.put('/:id/comments/:commentId', updateTaskCommentHandler);
router.delete('/:id/comments/:commentId', deleteTaskCommentHandler);

module.exports = router;
