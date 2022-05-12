const router = require('express').Router();

const apiRoutes = require('./api/');
const homeRoutes = require('./page-routes/home');
const gameRoutes = require('./page-routes/game');
const characterRoutes = require('./page-routes/character');

router.use('/', homeRoutes);
router.use('/game', gameRoutes);
// router.use('/dashboard', dashboardRoutes);
router.use('/api', apiRoutes);
router.use('/characters', characterRoutes);

module.exports = router;