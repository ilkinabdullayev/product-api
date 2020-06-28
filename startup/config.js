const config = require("config");

module.exports = function() {
  if (!config.get("jwtAccessKey")) {
    throw new Error("jwtAccessKey is not defined");
  }
};