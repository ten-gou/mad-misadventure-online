const router = require('express').Router() ;
const { Character } = require('../../models');

router.get('/', (req, res) => {
    Character.findAll()
    .then(dbCharacterData => res.json(dbCharacterData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
})

router.get('/:id', (req, res) => {
    Character.findOne({
        where: {
          id: req.params.id
        },
      })
        .then(dbCharacterData => {
          if (!dbCharacterData) {
            res.status(404).json({ message: 'No character found with this id' });
            return;
          }
          res.json(dbCharacterData);
        })
        .catch(err => {
          console.log(err);
          res.status(500).json(err);
    });
})

router.post('/', (req, res) => {
    Character.create({
        character_name: req.body.character_name,
        character_level: req.body.character_level,
        character_exp: req.body.character_exp,
        character_hp: req.body.character_hp,
        character_attack: req.body.character_attack,
        character_defense: req.body.character_defense
      })
        .then(dbCharacterData => res.json(dbCharacterData))
        .catch(err => {
          console.log(err);
          res.status(400).json(err);
        });
});

router.put('/:id', (req, res) => {
    Character.update(
        {
          character_name: req.body.character_name,
          character_level: req.body.character_level,
          character_exp: req.body.character_exp,
          character_hp: req.body.character_hp,
          character_attack: req.body.character_attack,
          character_defense: req.body.character_defense
        },
        {
          where: {
            id: req.params.id
          }
        }
      )
        .then(dbCharacterData => {
          if (!dbCharacterData) {
            res.status(404).json({ message: 'No character found with this id' });
            return;
          }
          res.json(dbCharacterData);
        })
        .catch(err => {
          console.log(err);
          res.status(500).json(err);
        });
})

router.delete('/:id', (req, res) => {
    Character.destroy({
        where: {
          id: req.params.id
        }
      })
        .then(dbCharacterData => {
          if (!dbCharacterData) {
            res.status(404).json({ message: 'No character found with this id!' });
            return;
          }
          res.json(dbCharacterData);
        })
        .catch(err => {
          console.log(err);
          res.status(500).json(err);
    });
})

module.exports = router;
