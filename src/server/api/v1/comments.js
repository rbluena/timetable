const router = require('express').Router();
const { isAuthenticated } = require('../../middleware/auth');
// const { validateLinkData } = require('../../middleware/link');
const { validateCommentData } = require('../../middleware/comments');
const {
  createCommentHandler,
  updateCommentHandler,
  deleteCommentHandler,
  getCommentsHandler,
  getCommentHandler,
} = require('../../handlers/comments');

router.post(
  '/create',
  isAuthenticated,
  validateCommentData,
  createCommentHandler
);
router.put('/:id/', isAuthenticated, updateCommentHandler);
router.delete('/:id', isAuthenticated, deleteCommentHandler);
router.get('/:id', getCommentHandler);
router.get('/', getCommentsHandler);

module.exports = router;
