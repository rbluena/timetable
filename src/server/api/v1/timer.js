const router = require('express').Router();
const { isAuthenticated } = require('../../middleware/auth');
// const { validateLinkData } = require('../../middleware/timer');

const {
  startTimerHandler,
  stopTimerHandler,
  updateTimerHandler,
  getTimeEntriesHandler,
  deleteTimeEntryHandler,
} = require('../../handlers/timer');

router.post('/start', isAuthenticated, startTimerHandler);
router.put('/:id/stop', isAuthenticated, stopTimerHandler);
router.put('/:id/update', isAuthenticated, updateTimerHandler);
router.get('/', isAuthenticated, getTimeEntriesHandler);
router.delete('/:id', isAuthenticated, deleteTimeEntryHandler);

module.exports = router;
