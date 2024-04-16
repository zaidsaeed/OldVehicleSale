const express = require("express");
const router = express.Router();
const passport = require("passport");

const { emailQueue, sendNewEmail } = require("../../queue/queue");

//Post model
const Post = require("../../models/Posts");

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
    .then((posts) => res.json(posts))
    .catch((err) => res.status(404).json({ nopostfound: "No Posts found" }));
});

//@route GET api/posts/:id
//@desc Get posts by id
//@access Public
router.get("/:id", (req, res) => {
  Post.findById(req.params.id)
    .then((post) => res.json(post))
    .catch((err) =>
      res.status(404).json({ nopostfound: "No Post found with that ID" })
    );
});

//@route GET api/posts/handle/:handle
//@desc Get posts by handle
//@access Public
router.get("/handle/:handle", (req, res) => {
  const errors = {};

  return Post.find({ handle: req.params.handle })
    .sort({ date: -1 })
    .then((posts) => res.json(posts))
    .catch((err) => res.status(404).json({ nopostfound: "No Posts found" }));
});

//@route GET api/posts/handle/:handle
//@desc Get posts by price
//@access Public
router.get("/priceRange/:priceRange", (req, res) => {
  const errors = {};

  return Post.find({ price: req.params.price })
    .sort({ date: -1 })
    .then((posts) => res.json(posts))
    .catch((err) => res.status(404).json({ nopostfound: "No Posts found" }));
});

//@route POST api/posts/
//@desc Create post
//@access Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
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
      price: req.body.price,
      priceRange: req.body.priceRange,
      email: req.body.email,
    });

    newPost
      .save()
      .then((post) => res.json(post))
      .catch((err) => console.log("err", err));

    // .then(async (post) => {
    //   const mssg = {
    //     from: "saeedzaid003@gmail.com",
    //     to: "saeedzaid003@gmail.com",
    //     subject: "Email Subject",
    //     text: "This is a test email",
    //   };
    //   return sendNewEmail(emailQueue, mssg);
    // })
    // .then((job) => {
    //   return res.json(job);
    // })
  }
);

//@route DELETE api/posts/:id
//@desc Delete post
//@access Private
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.findOne({ user: req.user.id }).then((profile) => {
      Post.findById(req.params.id)
        .then((post) => {
          if (post.user.toString() != req.user.id) {
            return res
              .status(401)
              .json({ notauthorized: "User not authorized" });
          }
          //Deleting post
          post.remove().then(() => res.json({ success: true }));
        })
        .catch((err) =>
          res.status(404).json({ postnotfound: "No post found" })
        );
    });
  }
);

//@route DELETE api/posts/:id
//@desc Delete post
//@access Private
router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.findOne({ user: req.user.id }).then(() => {
      Post.findOne({ model: req.body.model })
        .then((post) => {
          if (post.user.toString() != req.user.id) {
            return res
              .status(401)
              .json({ notauthorized: "User not authorized" });
          }
          //Deleting post
          post.deleteOne().then(() => res.json({ success: true }));
        })
        .catch((err) => {
          console.log("Error: ", err);
          res.status(404).json({ postnotfound: "No post found" });
        });
    });
  }
);

module.exports = router;
