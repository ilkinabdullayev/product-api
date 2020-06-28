const Joi = require('joi');
const mongoose = require('mongoose');
const express = require('express');
const { Product, validateProduct } = require('../models/product');
const router = express.Router();
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

router.get('/', auth, async (req, res) => {
    const createdByRule = req.user.role !== 'admin' ? ' -created_by' : '';
    const products = await Product.find()
    .populate('created_by', "-password -__v")
    .select("-__v" + createdByRule);
    res.send(products);
});

router.post('/', [auth, admin], async (req, res) => {
    const { error } = validateProduct(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let product = new Product({
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        created_by: req.user._id
    });

    product = await product.save();
    res.send(product);
});

router.put('/:id', [auth, admin], async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).send('Invalid Product id');
    }


    const { error } = validateProduct(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const product = await Product.findByIdAndUpdate(req.params.id,
        {
            name: req.body.name,
            price: req.body.price,
            description: req.body.description
        }, { new: true });

    if (!product) return res.status(404).send('The product with the given ID was not found.');

    res.send(product);
});

router.delete('/:id', [auth, admin], async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).send('Invalid Product id');
    }

    const product = await Product.findByIdAndRemove(req.params.id);

    if (!product) return res.status(404).send('The Product with the given ID was not found.');

    res.send(product);
});

router.get('/:id', auth, async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).send('Invalid Product id');
    }

    const product = await Product.findById(req.params.id).populate('created_by', "-password -__v").select("-__v");

    if (!product) return res.status(404).send('The Product with the given ID was not found.');

    res.send(product);
});


module.exports = router;