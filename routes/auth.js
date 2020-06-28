const express = require("express");
const router = express.Router();
const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const Joi = require("joi");
const sessionStore = require('../cache/session-store');


function validate(req) {
    const schema = {
        username: Joi.string()
            .required(),
        password: Joi.string()
            .required()
    };

    return Joi.validate(req, schema);
}


router.post("/login", async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const user = await User.findOne({ username: req.body.username });
    if (!user) return res.status(400).send("Invalid username or password");

    const isValid = await bcrypt.compare(req.body.password, user.password);
    if (!isValid)
        return res.status(400).send("Invalid username or password");

    const jwtToken = user.generateAuthToken();
    sessionStore.add(jwtToken);
    return res.send(jwtToken);
});

router.get("/logout", async (req, res) => {
    const token = req.header("x-product-auth-token");
    if (!token) return res.status(401).send("No token provided.")

    sessionStore.invalidate(token);


    return res.status(204).send('');
});


module.exports = router;