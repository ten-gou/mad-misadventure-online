const router = require("express").Router();
const {
  getEnemies,
  getEnemyById,
  createEnemy,
  updateEnemyById,
  deleteEnemyById,
} = require("../../lib/enemy");

router.get("/", async (req, res) => {
  try {
    const enemies = await getEnemies();
    res.status(200).json(enemies);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const enemy = await getEnemyById(req.params.id);
    if (!enemy) {
      res.status(404).json({ message: "Unable to get enemy with given id" });
    }
    res.status(200).json(enemy);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  try {
    const enemy = await createEnemy(req.body);
    res.status(200).json(enemy);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const enemy = await updateEnemyById(req.params.id, req.body);
    if (!enemy) {
      res.status(404).json({ message: "Unable to get enemy with given id" });
    }
    res.status(200).json(enemy);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const enemy = await deleteEnemyById(req.params.id);
    console.log(enemy);
    if (!enemy) {
      res.status(404).json({ message: "Unable to get enemy with given id" });
    }
    res.status(200).json(enemy);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
