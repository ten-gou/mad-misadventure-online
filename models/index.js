const Character = require('./Character');
const User = require('./User');
const Enemy = require('./Enemy');

Character.belongsTo(Character, {
    foreignKey: "character_id", 
    onDelete: 'SET NULL'
});

module.exports = { User, Character, Enemy};