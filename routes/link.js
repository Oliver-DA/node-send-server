const express = require("express");
const router  = express.Router();
const { check } = require("express-validator");
const auth = require("../middleware/auth");
const linkController = require("../controllers/linkController");


router.post("/",
    [
        check("name", "Please upload a file").not().isEmpty(),
        check("original_name", "Please upload a file").not().isEmpty()
    ],
    auth,
    linkController.newLink
)

router.get("/",
    linkController.allLinks
)

router.get("/:url",
    linkController.hasPassword,
    linkController.getLink,
)

router.post("/:url",
    linkController.confirmPassword,
    linkController.getLink,

)

module.exports = router