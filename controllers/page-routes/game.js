const router = require('express').Router();

// '/game/' route
router.get('/', async (req, res) => {
  res.render('game', {
    loggedIn: req.session.loggedIn,
    user_id: req.session.user_id,
    username: req.session.username
  })
})


module.exports = router;