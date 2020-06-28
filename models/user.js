const Joi = require("joi");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const config = require("config");
const _ = require("lodash");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
    maxlength: 255
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 255,
    trim: true
  },
  lastname: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 255,
    trim: true
  },
  age: Number,
  role: {
    type: String,
    enum : ['user','admin'],
    default: 'user'
  }
});

userSchema.methods.generateAuthToken = function() {
  return jwt.sign(
    {
      _id: this._id,
      role: this.role
    },
    config.get("jwtAccessKey")
  );
};


const User = mongoose.model("Users", userSchema);

function validateUser(user) {
  const schema = {
    name: Joi.string()
      .min(3)
      .max(255)
      .required(),
    username: Joi.string()
      .min(3)
      .max(255)
      .required(),
    password: Joi.string(),
    lastname: Joi.string(),
    role: Joi.string()
  };

  return Joi.validate(user, schema);
}

module.exports = {
  User: User,
  validate: validateUser
};