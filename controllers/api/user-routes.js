const router = require("express").Router();
const { User } = require("../../models");

const {
  getUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUserById
} = require("../../lib/user");

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
    const user = await createUser(req.body);
    if (!user) {
      res.status(404).json({ message: "Unable to get user with given id" });
    }
    req.session.save(() => {
        req.session.user_id = user.id;
        req.session.username = user.username;
        req.session.loggedIn = true;
    })
    res.status(200).json(user);
  } catch (err) {
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
    req.session.save(() => {
      req.session.user_id = user.id;
      req.session.username = user.username;
      req.session.loggedIn = true;
  
      res.json({ user: user.username, message: 'You are now logged in!' });
    });
  } catch (err) {
    res.status(500).json("Unable to log in")
  }
});

router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  }
  else {
    res.status(404).end();
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