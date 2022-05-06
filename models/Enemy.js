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
      enemy_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
      enemy_hp: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
      enemy_attack: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
      enemy_defense: {
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