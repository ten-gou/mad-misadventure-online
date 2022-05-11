const router = require('express').Router();

const userRoutes = require('./user-routes');
const enemyRoutes = require('./enemy-routes');
const characterRoutes = require('./character-routes');
const chatRoutes = require('./chat-routes');
const gameRoutes = require('./game-routes');

router.use('/users', userRoutes);
router.use('/enemies', enemyRoutes);
router.use('/characters', characterRoutes);
router.use('/chat', chatRoutes);
router.use('/game', gameRoutes);

module.exports = router;