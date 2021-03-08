const router = require('express').Router();
const { isAuthenticated } = require('../../middleware/auth');
// const { validateLinkData } = require('../../middleware/task');
const {
  createGroupHandler,
  updateGroupHandler,
  addUserToTheGroupHandler,
  deleteUserFromGroupHandler,
  getGroupHandler,
} = require('../../handlers/task');

router.post('/', isAuthenticated, createGroupHandler);
router.put('/:id/', isAuthenticated, updateGroupHandler);
router.put('/:id/assign', isAuthenticated, addUserToTheGroupHandler);
router.delete('/:id', isAuthenticated, deleteUserFromGroupHandler);
router.get('/:id', isAuthenticated, getGroupHandler);

module.exports = router;
