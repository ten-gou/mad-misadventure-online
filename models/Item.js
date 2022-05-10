const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// create our User model
class Item extends Model {}

Character.init(
    {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
     },
    item_name: {},
    item_type: {},
    item_attack: {},
    item_defense: {},
    item_comment: {}
   },
     {
       sequelize,
       freezeTableName: true,
       underscored: true,
       modelName: 'item'
     }
   )

module.exports = Item;