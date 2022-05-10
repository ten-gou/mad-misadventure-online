const { DataTypes } = require('sequelize/types');
const sequelize = require('../config/connection');
const Enemy = require('../models/Enemy');

const enemydata = [
    {
        enemy_name: "Minotaur",
        enemy_hp: 400,
        enemy_attack: 20,
        enemy_defense: 0,
        exp_drop: 100
    },
    {
        enemy_name: "Kraken",
        enemy_hp: 600,
        enemy_attack: 10,
        enemy_defense: 3,
        exp_drop: 100
    },
]

const seedEnemies = () => Enemy.bulkCreate(userdata, {individualHooks: true});

module.exports = seedEnemies;
