const sequelize = require('../config/connection');
const User = require('../models/User');

const userdata = [
    {
        username: 'TestAccount1',
        email: 'TestAccount1@gmail.com',
        password: 'password123',
        logged_in: false
    },
    {
        username: 'TestAccount2',
        email: 'TestAccount2@gmail.com',
        password: 'password123',
        logged_in: false,
    },
]

const seedUsers = () => User.bulkCreate(userdata, {individualHooks: true});

module.exports = seedUsers;
