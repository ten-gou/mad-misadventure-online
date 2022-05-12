const router = require('express').Router();
const {withAuth} = require('../../utils/auth');
const {getEnemyById} = require('../../lib/enemy');

// '/game/' route
router.get('/', withAuth, async (req, res) => {
  const enemy_id = 1;
  const enemyData = await getEnemyById(enemy_id)
  const {name, hp, attack, defense} = enemyData;
  const enemy = {
    name, hp, attack, defense
  }

  res.render('game', {
    loggedIn: req.session.loggedIn,
    enemy
  })
})


module.exports = router;