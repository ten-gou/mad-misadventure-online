const {
  getCharacterByUserId,
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
    let new_hp = Math.max(0, enemy.hp - damageDealt);
    let new_count = enemy.hit_counter + 1;
    let enemyAttackFlag = false;

    // logic to determine if enemy attacks here 
    if (new_count > 5) {
      await enemyAttackAll(enemyId);
      new_count = 0 ;
      enemyAttackFlag = true;
    }
    //reset enemy health if it dies - future feature to cycle through enemies 
    if (new_hp === 0) {
      new_hp = 300;
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
    const {num_potions, hp, id} = character;
    let add_hp = 0;
    if (num_potions > 0) {
      // potion is random in between 5 and 15
      add_hp =  Math.ceil(5 + Math.random() * 10)
      const new_hp = hp + add_hp;
      const new_potions = num_potions - 1 ;

      await updatePlayerDefense(character, 0)
      await updateCharacterById(id, {
        hp: new_hp,
        num_potions: new_potions
      });
      return {character, add_hp};
    } else {
      return {character, add_hp}
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
    const damageDealt = Math.max(0, enemy.attack - character.defense)
    const new_hp = Math.max(0, character.hp - damageDealt);
    const new_hit_count = 0;

    await updateEnemyById(enemyId, { hit_counter: new_hit_count });
    await updateCharacterById(character.id, {hp: new_hp})
  
    return damageDealt;
    
  } catch(err) {

  }
}

async function enemyAttackAll(enemyId) {
  try {
    const enemy = await getEnemyById(enemyId);
    const userList = await getLoggedInUsers();

    userList.forEach( async (user) => {
      await enemyAttackOne(user.id, enemyId);
    })  

    return enemy  

  } catch {
    console.log('enemy attack all failed')
  }
}

module.exports = { playerAttack, playerPotion, playerDefend, enemyAttackAll };
