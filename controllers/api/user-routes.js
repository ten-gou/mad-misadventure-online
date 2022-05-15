const router = require("express").Router();
const { User } = require("../../models");

const {
  getUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUserById,
  updateUserLoggedInStatus
} = require("../../lib/user");

const {
  createCharacter,
} = require("../../lib/character");

router.get("/", async (req, res) => {
  try {
    const users = await getUsers();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const user = await getUserById(req.params.id);
    if (!user) {
      res.status(404).json({ message: "Unable to get user with given id" });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const userData = { username, email, password };
    const { characterName } = req.body;

    if (!characterName) {
      res.status(400).json({ message: "Missing character name." });
      return
    }

    const user = await createUser(userData);

    if (typeof user === 'string' ) {
      console.error("Failed to create user.")
      res.status(400).json({ message: "Unable to create user." });
      return
    }

    const user_id = user.id;

    const characterData = {
      name: characterName,
      level: 1,
      exp: 0,
      hp: 10,
      attack: 5,
      defense: 4,
      user_id: user_id
    }
    await createCharacter(characterData);

    req.session.save(() => {
        req.session.user_id = user.id;
        req.session.username = user.username;
        req.session.loggedIn = true;

        res.json({message: "Account created."}) 
    })
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({where: {email: req.body.email}})
    if (!user) {
      res.status(404).json({ message: "user not found" });
      return
    };
    const validPassword = user.checkPassword(req.body.password);
    if (!validPassword) {
      res.status(400).json({ message: 'Incorrect password!' });
      return;
    };
    
    req.session.save( async () => {
      req.session.user_id = user.id;
      req.session.username = user.username;
      req.session.loggedIn = true;
      console.log(req.session)
      await updateUserLoggedInStatus(user.id, true);
      res.json({ user: user.username, message: 'You are now logged in!' });
    });

    
    
  } catch (err) {
    res.status(500).json("Unable to log in")
  }
});

router.post('/logout', async (req, res) => {
  console.log(req.session)
  if (req.session.loggedIn) {
    console.log(req.session)
    await updateUserLoggedInStatus(req.session.user_id, false);
    req.session.destroy(() => {
      res.status(204).end();
    });

  }
  else {
    res.status(404).json({message: "404"});
  }
});

router.put("/:id", async (req, res) => {
  try {
    const user = await updateUserById(req.params.id, req.body);
    if (!user) {
      res.status(404).json({ message: "Unable to get user with given id" });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const user = await deleteUserById(req.params.id);
    console.log(user);
    if (!user) {
      res.status(404).json({ message: "Unable to get user with given id" });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;