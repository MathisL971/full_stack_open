// Require utility modules
const config = require("./utils/config");
const logger = require("./utils/logger");
const middleware = require("./utils/middleware");

// Require express and instantiate express app
const express = require("express");
const app = express();

// Require additional dependencies
const cors = require("cors");

// Require router
const blogsRouter = require("./controllers/blogs");
const usersRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");

// Require mongoose and disable strict mode for queries
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

// Log connection attempt to database
logger.info("--> Connecting to database...");

// Connect to database
mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info("--> Connected to MongoDB");
  })
  .catch((error) => {
    logger.error("--> Error while connecting to MongoDB:", error.message);
  });

// Register middleware functions to the application's request-response cycle
app.use(cors()); // Enable Cross-Origin Resource Sharing (CORS)
app.use(express.static("build")); // Enable servicing of static files from the "build" directory
app.use(express.json()); // Enable parsing of incoming requests with JSON payloads
app.use(middleware.requestLogger); // Enable detailed logging of HTTP requests
app.use(middleware.tokenExtractor); // Enable extraction of token
app.use(middleware.userExtractor); // Enable extraction of user

// Enable router middleware for any incoming requests
app.use("/api/blogs", blogsRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);

app.use(middleware.unknownEndpoint); // Enable logging of unknown endpoint HTTP errors
app.use(middleware.errorHandler); // Enable handling of various errors

// Export app
module.exports = app;
