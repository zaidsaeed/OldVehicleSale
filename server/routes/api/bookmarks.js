const express = require("express");
const router = express.Router();
const passport = require("passport");

//Post model
const Bookmark = require("../../models/Bookmarks");

//@route GET api/posts
//@desc Get posts
//@access Public
router.get("/", (req, res) => {
  Bookmark.find()
    .sort({ date: -1 })
    .then(bookmarks => res.json(bookmarks))
    .catch(err =>
      res.status(404).json({ nobookmarkfound: "No Bookmarks found" })
    );
});

//@route GET api/posts/:id
//@desc Get posts by id
//@access Public
router.get("/:id", (req, res) => {
  Bookmark.findById(req.params.id)
    .then(post => res.json(post))
    .catch(err =>
      res.status(404).json({ nopostfound: "No Post found with that ID" })
    );
});

//@route POST api/bookmarks/
//@desc Create bookmark
//@access Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const newBookmark = new Bookmark({
      post: req.body.post,
      user: req.user.id
    });
    newBookmark.save().then(post => res.json(post));
    req.user.bookmarks.push(newBookmark);
    req.user.save();
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
      Bookmark.findById(req.params.id)
        .then(bookmark => {
          if (bookmark.user.toString() != req.user.id) {
            return res
              .status(401)
              .json({ notauthorized: "User not authorized" });
          }
          //removing post from user array
          console.log("req.params", req.params);
          req.user.bookmarks = req.user.bookmarks.filter(bookmark => {
            console.log("bookmark", bookmark);
            console.log("truth", bookmark != req.params.id);
            if (bookmark != req.params.id) return bookmark;
          });
          req.user.save();
          //Deleting post
          bookmark.remove().then(() => res.json({ success: true }));
        })
        .catch(err => res.status(404).json({ postnotfound: "No post found" }));
    });
  }
);

module.exports = router;
