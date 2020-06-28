const jwt = require("jsonwebtoken");
const config = require("config");
const sessionStore = require('../cache/session-store');

function auth(req, res, next) {
  const token = req.header("x-product-auth-token");
  if (!token || !sessionStore.check(token)) return res.status(401).send("Access denied. No token provided.");

  try {
    const decodedPayload = jwt.verify(token, config.get("jwtAccessKey"));
    req.user = decodedPayload;
    next();
  } catch (ex) {
    res.status(400).send("Invalid token.");
  }
}

module.exports = auth;