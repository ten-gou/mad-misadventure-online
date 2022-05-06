const router = require('express').Router();

// '/game/' route
router.get('/', async (req, res) => {
  res.render('game', {
    loggedIn: req.session.loggedIn
  })
})


module.exports = router;