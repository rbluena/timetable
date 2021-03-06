const router = require('express').Router();
const authRoutes = require('./auth');
const projectsRoutes = require('./projects');
const tasksRoutes = require('./tasks');
const timerRoutes = require('./timer');
// const todosRoutes = require('./todos');
// const commentsRoutes = require('./comments');
// const settingsRoutes = require('./settings');
// const mailRoutes = require('./mail');

router.use('/auth', authRoutes);
router.use('/projects', projectsRoutes);
router.use('/tasks', tasksRoutes);
router.use('/time_entries', timerRoutes);
// router.use('/todos', todosRoutes);
// router.use('/comments', commentsRoutes);
// router.use('/settings', settingsRoutes);
// router.use('/mail', mailRoutes);

module.exports = router;
