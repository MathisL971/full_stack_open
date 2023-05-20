// Require app
const app = require("./app");

// Require utility modules
const config = require("./utils/config");
const logger = require("./utils/logger");

// Boot up server on local port
app.listen(config.PORT, () => {
  logger.info(
    `--> Server running on port ${config.PORT}: http://localhost:3001/`
  );
});
