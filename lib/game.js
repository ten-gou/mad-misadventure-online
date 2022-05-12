const { getCharacterByUserId } = require("./character");
const { getEnemyById, updateEnemyById } = require("./enemy");

async function playerAttack(userId, enemyId) {
  try {
    const [character, enemy] = await Promise.all([
      getCharacterByUserId(userId),
      getEnemyById(enemyId),
    ]);
    console.log("playerAttack character: ", character)
    console.log("playerAttack enemy: ", enemy)

    const damageDealt = character.attack - enemy.defense

    const new_hp = Math.max(0, enemy.hp - damageDealt);
    const new_count = enemy.hit_counter++;

    await updateEnemyById(enemyId, { hp: new_hp, hit_counter: new_count });
    // if no rows are updated return null 
    return {character, enemy, new_hp};
  } catch (err) {
    return "Unable to process attack";
  }
}

module.exports = { playerAttack };
