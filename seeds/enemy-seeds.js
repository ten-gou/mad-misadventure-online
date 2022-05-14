const sequelize = require('../config/connection');
const Enemy = require('../models/Enemy');

const enemydata = [
    {
        name: "Minotaur",
        hp: 400,
        attack: 20,
        defense: 0,
        hit_counter: 0,
        exp_drop: 100
    },
    {
        name: "Kraken",
        hp: 600,
        attack: 10,
        defense: 3,
        hit_counter: 0,
        exp_drop: 100
    },
    {
        name: "Pudding",
        hp: 50,
        attack: 2,
        defense: 0,
        hit_counter: 0,
        exp_drop: 50
    }
]

const seedEnemies = () => Enemy.bulkCreate(enemydata, {individualHooks: true});

module.exports = seedEnemies;
