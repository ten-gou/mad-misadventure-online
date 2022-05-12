const Character = require('./Character');
const User = require('./User');
const Enemy = require('./Enemy');

Character.belongsTo(User, {
    foreignKey: "user_id"
});

User.hasOne(Character, {
    foreignKey: 'user_id'
});

Character.sync()


module.exports = { User, Character, Enemy};