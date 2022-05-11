const { DataTypes } = require('sequelize/types');
const sequelize = require('../config/connection');
const Character = require('../models/Character');

const characterdata = [
    {
        name: "Jucika",
        level: 10,
        exp: 10000,
        hp: 300,
        attack: 20,
        defense: 5,
        user_id: 1
    },
    {
        name: "Paprika",
        level: 8,
        exp: 8500,
        hp: 240,
        attack: 18,
        defense: 4,
        user_id: 2
    },
]

const seedCharacters = () => Character.bulkCreate(characterdata, {individualHooks: true});

module.exports = seedCharacters;