const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

//Post model
const Post = require("../../models/Posts");

//Profile model
// const Profile = require("../../models/Profile");

//Validation
const validatePostInput = require("../../validation/post");

//@route GET api/posts/test
//@desc TESTS post route
//@access Public
router.get("/test", (req, res) => res.json({ msg: "Posts WORKS" }));

//@route GET api/posts
//@desc Get posts
//@access Public
router.get("/", (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then(posts => res.json(posts))
    .catch(err => res.status(404).json({ nopostfound: "No Posts found" }));
});



//@route GET api/posts/:id
//@desc Get posts by id
//@access Public
router.get("/:id", (req, res) => {
  Post.findById(req.params.id)
    .then(post => res.json(post))
    .catch(err =>
      res.status(404).json({ nopostfound: "No Post found with that ID" })
    );
});

//@route GET api/posts/handle/:handle
//@desc Get profile by handle
//@access Public
router.get('/handle/:handle', (req, res) => {
    const errors= {};

    Post.find({ handle: req.params.handle })
        .sort({date: -1})
        .then(posts => res.json(posts))
        .catch(err => res.status(404).json({ nopostfound: "No Posts found" }));
} );


//@route POST api/posts/
//@desc Create post
//@access Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log("req", req.body);
    const { errors, isValid } = validatePostInput(req.body);

    //Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
    const newPost = new Post({
      description: req.body.description,
      model: req.body.model,
      imageURL: req.body.imageURL,
      user: req.user.id,
        name: req.body.name,
        handle: req.body.handle,
        price: req.body.price
    });

    newPost.save().then(post => res.json(post));
  }
);

//@route DELETE api/posts/:id
//@desc Delete post
//@access Private
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.findOne({ user: req.user.id }).then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          if (post.user.toString() != req.user.id) {
            return res
              .status(401)
              .json({ notauthorized: "User not authorized" });
          }
          //Deleting post
          post.remove().then(() => res.json({ success: true }));
        })
        .catch(err => res.status(404).json({ postnotfound: "No post found" }));
    });
  }
);



module.exports = router;
