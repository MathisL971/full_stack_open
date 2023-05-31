const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const usersRouter = require("express").Router();

usersRouter.get("/", async (req, res) => {
  const users = await User.find({}).populate("blogs", {
    title: 1,
    author: 1,
    url: 1,
  });
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
      blogs: [],
    });

    // Create an instance of a JavaScript user for the web token
    const userForToken = {
      username,
      id: newUser._id,
    };

    // Create token
    const token = jwt.sign(userForToken, process.env.SECRET);

    const savedUser = await newUser.save();

    res
      .status(201)
      .send({ token, username: savedUser.username, name: savedUser.name });
  } catch (error) {
    next(error);
  }
});

module.exports = usersRouter;
