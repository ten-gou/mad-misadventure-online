const { Character } = require('../../models');

const router = require('express').Router();

// '/characters/' route
router.get('/', async (req, res) => {
  res.render('characters', {
    loggedIn: req.session.loggedIn,
    user_id: req.session.user_id,
    username: req.session.username
  })
})

router.get('/:id', async (req, res) => {
  Character.findOne({
    where: {
      id: req.session.user_id
    },
    attributes: [
      'id',
      'name',
      'level',
      'exp',
      'hp',
      'attack',
      'defense',
    ]
  })
  .then(CharacterInfo => {
    if (!CharacterInfo) {
      res.status(404).json({ message: 'No character found with this id.' });
      return;
    }

    const post = CharacterInfo.get({ plain: true });

    res.render('characters', {
      post,
      loggedIn: req.session.loggedIn
    })
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
})


module.exports = router;