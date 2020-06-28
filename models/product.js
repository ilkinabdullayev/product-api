const Joi = require("joi");
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true
  },
  description: String,
  created_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    required: true
  }
});

const Product = mongoose.model("Products", productSchema);

function validateProduct(product) {
  const schema = {
    name: Joi.string()
      .min(5)
      .max(50)
      .required(),
    price: Joi.number()
      .min(0)
      .required(),
    description: Joi.string()
      .min(5)
      .max(200)
  };

  return Joi.validate(product, schema);
}

module.exports = {
  Product,
  validateProduct: validateProduct
};