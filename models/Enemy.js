const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Enemy extends Model {}

Enemy.init(
    {
      id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
      name: {
      type: DataTypes.STRING,
      allowNull: false
    },
      hp: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
      attack: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
      defense: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
      exp_drop: {
      type: DataTypes.INTEGER,
      allowNull: false
      }
    },
      {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'enemy'
      }
)

module.exports = Enemy;