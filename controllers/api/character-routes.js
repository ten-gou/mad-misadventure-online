const router = require("express").Router();
const {withAuth} = require('../../utils/auth');

const {
  getCharacters,
  getCharacterById,
  createCharacter,
  updateCharacterById,
  updateCharacterByNameAndId,
  deleteCharacterById,
} = require("../../lib/character");

router.get("/", async (req, res) => {
  try {
    const characters = await getCharacters();
    res.status(200).json(characters);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const character = await getCharacterById(req.params.id);
    if (!character) {
      res
        .status(404)
        .json({ message: "Unable to get character with given id" });
    }
    res.status(200).json(character);
  } catch {
    res.status(500).json(err);
  }
});

router.post("/", withAuth, async (req, res) => {
  try {
    const { name } = req.body;
    const user_id = req.session.user_id;

    const characterData = {
      name: name,
      level: 1,
      exp: 0,
      hp: 10,
      attack: 5,
      defense: 4,
      user_id: user_id
    }
    const character = await createCharacter(characterData);
    res.status(200).json(character);
  } catch {
    res.status(500).json(err);
  }
});

router.put("/", async (req, res) => {
  console.log("entered route")
  const user_id = req.session.user_id;
  const { currentName, newName } = req.body;

  console.log("user_id:", user_id);
  console.log("currentName:", currentName);
  console.log("newName:", newName);

  try {
    const character = await updateCharacterByNameAndId(user_id, currentName, newName);
    if (!character) {
      res
        .status(404)
        .json({ message: "Unable to update character" });
    }
    res.status(200).json(character);
  } catch {
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const character = await deleteCharacterById(req.params.id);
    console.log(character);
    if (!character) {
      res
        .status(404)
        .json({ message: "Unable to get character with given id" });
    }
    res.status(200).json(character);
  } catch {
    res.status(500).json(err);
  }
});

module.exports = router;
