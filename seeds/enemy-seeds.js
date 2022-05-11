const sequelize = require('../config/connection');
const Enemy = require('../models/Enemy');

const enemydata = [
    {
        name: "Minotaur",
        hp: 400,
        attack: 20,
        defense: 0,
        exp_drop: 100
    },
    {
        name: "Kraken",
        hp: 600,
        attack: 10,
        defense: 3,
        exp_drop: 100
    },
]

const seedEnemies = () => Enemy.bulkCreate(enemydata, {individualHooks: true});

module.exports = seedEnemies;
