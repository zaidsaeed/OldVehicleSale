const express = require("express");
const router = express.Router();

//@route GET api/users/test
//@desc TESTS post route
//@access Public
router.get("/test", (req, res) => res.json({ msg: "USERS WORKS" }));

module.exports = router;
