const error = require("../middleware/error");
const products = require("../routes/products");
const auth = require("../routes/auth");
const express = require("express");

module.exports = function(app) {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use("/api/auth", auth);
  app.use("/api/products", products);
  app.use(error);
};