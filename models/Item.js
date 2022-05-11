const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// create our User model
class Item extends Model {}

Item.init(
    {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
     },
    item_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    item_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    item_attack: {
      type: DataTypes.INTEGER,
    },
    item_defense: {
      type: DataTypes.INTEGER,
    },
    item_comment: {
      type: DataTypes.STRING,
    }
   },
     {
       sequelize,
       freezeTableName: true,
       underscored: true,
       modelName: 'item'
     }
   )

module.exports = Item;