const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const loginRouter = require("express").Router();
const User = require("../models/user");

loginRouter.post("/", async (req, res) => {
  // Get login credentials from request body
  const { username, password } = req.body;

  // Find user in database using username
  const user = await User.findOne({ username });

  // Check if password is valid
  const passwordCorrect =
    user === null ? false : await bcrypt.compare(password, user.passwordHash);

  // If user does not exist or password is not valid
  if (!(user && passwordCorrect)) {
    // Return adequate status code and error message
    return res.status(401).json({
      error: "invalid username or password",
    });
  }

  // Create an instance of a JavaScript user for the web token
  const userForToken = {
    username,
    id: user._id,
  };

  // Create token
  const token = jwt.sign(userForToken, process.env.SECRET);

  // Assign successful status code to response and send back the web token object with it
  res.status(200).send({ token, username: user.username, name: user.name });
});

module.exports = loginRouter;
