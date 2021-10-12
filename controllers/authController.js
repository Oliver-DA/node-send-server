const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config({ path:"variables.env" });
const { validationResult } = require("express-validator");

exports.authUser = async (req, res, next) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({msg: errors.array()});
    }

    const { body: { email, password } } = req;

    let user = await User.findOne({email});

    if(!user) {
        res.status(401).json({ msg: "This username is not registered"});
        return next();
    }

    if(bcrypt.compareSync(password, user.password)) {
        const token = jwt.sign({
            name: user.name,
            id: user._id,
        }, process.env.SECRET,{
            expiresIn: "1h"
        });
        res.json({token});

    } else {
        res.status(401).json({ msg: "Incorrect password" });
        return next()
    }

}

exports.authenticatedUser = (req, res, next) => {
    res.json(req.user)
}