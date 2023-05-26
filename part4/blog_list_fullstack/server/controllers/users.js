const bcrypt = require("bcrypt");
const User = require("../models/user");
const usersRouter = require("express").Router();

usersRouter.get("/", async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

usersRouter.post("/", async (req, res, next) => {
  const { username, password, name } = req.body;

  if (!password) {
    return res.status(400).json({ error: "Password is missing." });
  }

  if (password.length < 3) {
    return res.status(400).json({ error: "Password is too short." });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  try {
    const newUser = new User({
      username,
      passwordHash,
      name,
    });

    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    next(error);
  }
});

module.exports = usersRouter;
