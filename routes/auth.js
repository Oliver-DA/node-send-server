const express = require("express");
const router  = express.Router();
const authController = require("../controllers/authController");
const { check } = require("express-validator");
const auth = require("../middleware/auth");


router.post("/",
    [
        check("email", "Please type a valid emai").isEmail(),
        check("password", "Pelase provide a password").not().isEmpty()
    ],
    authController.authUser
);

router.get("/",
    auth,
    authController.authenticatedUser
);

module.exports = router