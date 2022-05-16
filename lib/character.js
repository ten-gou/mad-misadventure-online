const req = require("express/lib/request");
const res = require("express/lib/response");
const { Character } = require("../models");

async function getCharacters() {
  try {
    const characters = await Character.findAll();
    return characters;
  } catch (err) {
    console.log(err);
    return "Unable to get characters";
  }
}

async function getCharacterById(characterId) {
  try {
    const character = await Character.findOne({
      where: { id: characterId },
    });
    return character;
  } catch (err) {
    console.log(err);
    return "Unable to get character";
  }
}

async function updateCharacterByNameAndId(user_id, currentName, newName) {
  try {
    const rows = await Character.update(
      {
         name: newName,
        // level: characterData.level,
        // exp: characterData.exp,
        // hp: characterData.hp,
        // attack: characterData.attack,
        // defense: characterData.defense,
      },
      {
        where: { user_id: user_id, name: currentName },
      }
    );
    return rows;
  } catch (err) {
    console.log(err);
    return "Unable to update character";
  }
}

async function getCharacterByUserId(userId) {
  try {
    const character = await Character.findOne({
      where: { user_id: userId },
    });
    return character;
  } catch (err) {
    console.log(err);
    return "Unable to get character";
  }
}

async function createCharacter(characterData) {
  try {
    const character = await Character.create({
      name: characterData.name,
      level: characterData.level,
      exp: characterData.exp,
      hp: characterData.hp,
      attack: characterData.attack,
      defense: characterData.defense,
      user_id: characterData.user_id
    });
    return character;
  } catch (err) {
    console.log(err);
    return "Unable to create character";
  }
}

async function updateCharacterById(characterId, characterData) {
  try {
    const rows = await Character.update(
      {
        // name: characterData.name,
        // level: characterData.level,
        // exp: characterData.exp,
        // hp: characterData.hp,
        // attack: characterData.attack,
        // defense: characterData.defense,
        ...characterData
      },
      {
        where: {id: characterId},
      }
    );
    return rows;
  } catch (err) {
    console.log(err);
    return "Unable to update character";
  }
}

async function deleteCharacterById(characterId) {
  try {
      const character = await Character.destroy({
        where: { id: characterId },
      })
      return character
  } catch (err) {
    console.log(err);
    return "Unable to delete character";
  }
}

module.exports = {
  getCharacters,
  getCharacterById,
  getCharacterByUserId,
  createCharacter,
  updateCharacterById,
  updateCharacterByNameAndId,
  deleteCharacterById,
};
