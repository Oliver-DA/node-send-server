const User = require("../models/User");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");

exports.newUser = async (req, res) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({msg: errors.array()});
    }

    const { body: { email, password } } = req
    let user = await User.findOne({email});

    if (user) {
        return res.status(400).json({ msg: "This user already exists"})
    }

    user = new User(req.body);
    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(password, salt)
    await user.save();

    res.json({ msg: "User created succesfully" });
}