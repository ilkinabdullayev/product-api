const express = require("express");
const logging = require("./startup/logging")();
const config = require("./startup/config")();
require("./startup/database")();

const app = express();
require("./startup/routes")(app);
//require("./startup/prod")(app);

const winston = require("winston");

const port = process.env.PORT || 5000;
const server = app.listen(port, () =>
  winston.info("Listening on port", port, "...")
);

module.exports = server;