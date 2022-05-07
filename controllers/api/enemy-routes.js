const router = require('express').Router() ;
const { Enemy } = require('../../models');

router.get('/', (req, res) => {
    Enemy.findAll()
    .then(dbEnemyData => res.json(dbEnemyData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
})

router.get('/:id', (req, res) => {
    Enemy.findOne({
        where: {
          id: req.params.id
        },
      })
        .then(dbEnemyData => {
          if (!dbEnemyData) {
            res.status(404).json({ message: 'No enemy found with this id' });
            return;
          }
          res.json(dbEnemyData);
        })
        .catch(err => {
          console.log(err);
          res.status(500).json(err);
    });
})

router.post('/', (req, res) => {
    Enemy.create({
        enemy_name: req.body.enemy_name,
        enemy_hp: req.body.enemy_hp,
        enemy_attack: req.body.enemy_attack,
        enemy_defense: req.body.enemy_defense,
        exp_drop: req.body.exp_drop
      })
        .then(dbEnemyData => res.json(dbEnemyData))
        .catch(err => {
          console.log(err);
          res.status(400).json(err);
        });
});

router.put('/:id', (req, res) => {
    Enemy.update(
        {
            enemy_name: req.body.enemy_name,
            enemy_hp: req.body.enemy_hp,
            enemy_attack: req.body.enemy_attack,
            enemy_defense: req.body.enemy_defense,
            exp_drop: req.body.exp_drop
        },
        {
          where: {
            id: req.params.id
          }
        }
      )
        .then(dbEnemyData => {
          if (!dbEnemyData) {
            res.status(404).json({ message: 'No enemy found with this id' });
            return;
          }
          res.json(dbEnemyData);
        })
        .catch(err => {
          console.log(err);
          res.status(500).json(err);
        });
})

router.delete('/:id', (req, res) => {
    Enemy.destroy({
        where: {
          id: req.params.id
        }
      })
        .then(dbEnemyData => {
          if (!dbEnemyData) {
            res.status(404).json({ message: 'No enemy found with this id!' });
            return;
          }
          res.json(dbEnemyData);
        })
        .catch(err => {
          console.log(err);
          res.status(500).json(err);
    });
})

module.exports = router;