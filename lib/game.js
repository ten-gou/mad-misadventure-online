const {
  getCharacterByUserId,
  getCharacterById,
  updateCharacterById,
} = require("./character");
const { getEnemyById, updateEnemyById } = require("./enemy");
const { getLoggedInUsers } = require("./user");

//Helper function - function is run during each action
async function updatePlayerDefense(character, newFlag) {
  try {
    // arbitrarily deciding to increase defense x 2 when defend_flag = 1
    if (character.defend_flag == 1 && newFlag == 0) {
      const new_defense = character.defense / 2;
      await updateCharacterById(character.id, {
        defend_flag: 0,
        defense: new_defense,
      });
    } else if (character.defend_flag == 0 && newFlag == 1) {
      const new_defense = character.defense * 2;
      character.defend_flag = newFlag;
      await updateCharacterById(character.id, {
        defend_flag: 1,
        defense: new_defense,
      });
    }
  } catch (err) {
    return "unable to update player defense ";
  }
}

async function playerAttack(userId, enemyId) {
  try {
    const [character, enemy] = await Promise.all([
      getCharacterByUserId(userId),
      getEnemyById(enemyId),
    ]);
    await updatePlayerDefense(character, 0)
    const damageDealt = character.attack - enemy.defense
    const new_hp = Math.max(0, enemy.hp - damageDealt);
    var new_count = enemy.hit_counter++;
    var enemyAttackFlag = 0;

    // could make this a function of Math.rand() 
    if (new_count > 5) {
      await enemyAttackAll(enemyId);
      new_count = 0 ;
      enemyAttackFlag = 1;
    }

    await updateEnemyById(enemyId, { hp: new_hp, hit_counter: new_count });
  
    return {character, enemy, new_hp, enemyAttackFlag};
  } catch (err) {
    return "Unable to process attack";
  }
}

async function playerPotion(userId) {
  try {
    const character = await getCharacterByUserId(userId);

    if (character.num_potions > 0) {
      // potion is random in between 5 and 15
      const add_hp =  Math.ceil(5 + Math.random() * 10)
      const new_hp = character.hp + add_hp;
      const new_potions = character.num_potions - 1 ;

      await updatePlayerDefense(character, 0)
      await updateCharacterById(character.id, {
        hp: new_hp,
        num_potions: new_potions
      });
      return { character, add_hp };
    } else {
      return {character: null, add_hp: null}
    }
    
  } catch (err) {
    return "Unable to process potion";
  }
}

async function playerDefend(userId) {
  try {
    const character = await getCharacterByUserId(userId);
    const new_flag = 1

    await updatePlayerDefense(character, new_flag);
    return { character, new_flag };
  } catch (err) {
    return "Unable to process Defend";
  }
}

async function enemyAttackOne(userId, enemyId) {
  try {
    const [character, enemy] = await Promise.all([
      getCharacterByUserId(userId),
      getEnemyById(enemyId),
    ]);
    const damageDealt = enemy.attack - character.defense
    const new_hp = Math.max(0, enemy.hp - damageDealt);
    const new_count = 0;

    await updateEnemyById(enemyId, { hp: new_hp, hit_counter: new_count });
    return damageDealt;
    
  } catch(err) {

  }
}

async function enemyAttackAll(enemyId) {
  try {
    const enemy = await getEnemyById(enemyId);
    const userList = await getLoggedInUsers();
    console.log(userList)

    for (let i=0; i<userList.length; i++) {
      //damageDealt = await enemyAttackOne(userList[i], enemyId);
    }

    return enemy  

  } catch {

  }
}

module.exports = { playerAttack, playerPotion, playerDefend };
