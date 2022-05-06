const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Character extends Model {}

Character.init(
    {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
     },
     character_name: {
      type: DataTypes.STRING,
      allowNull: false
     },
     character_level: {
     type: DataTypes.INTEGER,
     allowNull: false
   },
     character_exp: {
     type: DataTypes.INTEGER,
     allowNull: false
   },
     character_hp: {
      type: DataTypes.INTEGER,
      allowNull: false
     },
     character_attack: {
      type: DataTypes.INTEGER,
      allowNull: false
     },
     character_defense: {
      type: DataTypes.INTEGER,
      allowNull: false
     }
   },
     {
       sequelize,
       freezeTableName: true,
       underscored: true,
       modelName: 'character'
     }
   )

module.exports = Character