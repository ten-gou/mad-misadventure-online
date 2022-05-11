const { getCharacterById } = require("./character");
const { getEnemyById, updateEnemyById } = require("./enemy");

async function playerAttack(userId, enemyId) {
  try {
    var [character, enemy] = await Promise.all([
      getCharacterById(userId),
      getEnemyById(enemyId),
    ]);

    const new_hp = Math.max(0, enemy.hp - character.attack);
    const new_count = enemy.hit_counter++;

    await updateEnemyById(enemyId, { hp: new_hp, hit_counter: new_count });
    // if no rows are updated return null 
    return {character, enemy};
  } catch (err) {
    return "Unable to process attack";
  }
}

module.exports = { playerAttack };
