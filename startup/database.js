const mongoose = require("mongoose");
const winston = require("winston");
const config = require("config");

module.exports = function connectToDatabase() {
  const db = config.get('mongo.host');
  mongoose
    .connect(
      db,
      { 
          useNewUrlParser: true, 
          useUnifiedTopology:true }
    )
    .then(() => console.info(`Connected to ${db} successfully...`));
};