const { Enemy, User, Character } = require('../../models');
const router = require('express').Router();

router.get('/', async (req, res) => {
  res.render('homepage', {
    loggedIn: req.session.loggedIn,
    user_id: req.session.user_id,
    username: req.session.username
  })
})


router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

module.exports = router;