const express = require("express");
const router  = express.Router();
const userController = require("../controllers/userController");
const { check } = require("express-validator");

router.post("/",
    [
       check("name", "Name is required").not().isEmpty(),
       check("email", "Invalid email please try again").isEmail(),
       check("password", "Your password must be at least 6 character long").isLength({min: 6})
    ],
    userController.newUser
);

module.exports = router