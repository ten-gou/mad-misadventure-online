const { User } = require("../models");

async function getUsers() {
  try {
    const users = await User.findAll();
    return users;
  } catch (err) {
    console.log(err);
    return "Unable to get users";
  }
}

async function getUserById(userId) {
  try {
    const user = await User.findOne({
        attributes: { exclude: ['password'] },
      where: { id: userId },
    });
    return user;
  } catch (err) {
    console.log(err);
    return "Unable to get user";
  }
}

async function createUser(userData) {
  try {
    const user = await User.create({
        username: userData.username,
        email: userData.email,
        password: userData.password  });
    return user;
  } catch (err) {
    console.log(err);
    return "Unable to create user";
  }
}

async function updateUserById(userId, userData) {
  try {
    const user = await User.update(
      {
        username: userData.username,
        email: userData.email,
        password: userData.password
      },
      {
        where: {id: userId},
      }
    );
    return user;
  } catch (err) {
    console.log(err);
    return "Unable to update user";
  }
}

async function deleteUserById(userId) {
  try {
      const user = await User.destroy({
        where: { id: userId },
      })
      return user
  } catch (err) {
    console.log(err);
    return "Unable to delete user";
  }
}

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUserById
};
