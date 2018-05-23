const express = require("express");
const router = express.Router();

//@route GET api/posts/test
//@desc TESTS post route
//@access Public
router.get("/test", (req, res) => res.json({ msg: "Posts WORKS" }));

module.exports = router;
