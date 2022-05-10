const req = require("express/lib/request");
const res = require("express/lib/response");
const { Enemy } = require("../models");

async function getEnemies() {
  try {
    const enemys = await Enemy.findAll();
    return enemys;
  } catch (err) {
    console.log(err);
    return "Unable to get enemies";
  }
}

async function getEnemyById(enemyId) {
  try {
    const enemy = await Enemy.findOne({
      where: { id: enemyId },
    });
    return enemy;
  } catch (err) {
    console.log(err);
    return "Unable to get enemy";
  }
}

async function createEnemy(enemyData) {
  try {
    const enemy = await Enemy.create({
      name: enemyData.name,
      hp: enemyData.hp,
      attack: enemyData.attack,
      defense: enemyData.defense,
      exp_drop: enemyData.exp_drop
    });
    return enemy;
  } catch (err) {
    console.log(err);
    return "Unable to create enemy";
  }
}

async function updateEnemyById(enemyId, enemyData) {
  try {
    const enemy = await Enemy.update(
      {
        // name: enemyData.name,
        // hp: enemyData.hp,
        // attack: enemyData.attack,
        // defense: enemyData.defense,
        // exp_drop: enemyData.exp_drop
        ...enemyData
      },
      {
        where: {id: enemyId},
      }
    );
    return enemy;
  } catch (err) {
    console.log(err);
    return "Unable to update enemy";
  }
}

async function deleteEnemyById(enemyId) {
  try {
      const enemy = await Enemy.destroy({
        where: { id: enemyId },
      })
      return enemy
  } catch (err) {
    console.log(err);
    return "Unable to delete enemy";
  }
}

module.exports = {
  getEnemies,
  getEnemyById,
  createEnemy,
  updateEnemyById,
  deleteEnemyById,
};
