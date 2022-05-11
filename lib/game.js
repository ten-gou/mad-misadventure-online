const { getCharacterById } = require("./character");
const { getEnemyById, updateEnemyById } = require("./enemy");

async function playerAttack(userId, enemyId) {
  try {
    var [character, enemy] = await Promise.all([
      getCharacterById(userId),
      getEnemyById(enemyId),
    ]);
    enemy.hp = Math.max(0, enemy.hp - character.attack);
    console.log(`${character.name} ATTACKS ${enemy.name}`);
    console.log(`${enemy.name} has ${enemy.hp} health remaining!`);
    await updateEnemyById(enemyId, { hp: new_hp });
    return enemy;
  } catch (err) {
    return "Unable to process attack";
  }
}

module.exports = { playerAttack };
