const express = require("express");
const router = express.Router();
const passport = require("passport");

//Post model
const Bookmark = require("../../models/Bookmarks");

//@route GET api/bookmarks
//@desc Get bookmarks
//@access Public
router.get("/", (req, res) => {
  Bookmark.find()
    .sort({ date: -1 })
    .then((bookmarks) => res.json(bookmarks))
    .catch((err) =>
      res.status(404).json({ nobookmarkfound: "No Bookmarks found" })
    );
});

//@route GET api/bookmarks/:id
//@desc Get bookmarks by id
//@access Public
router.get("/:id", (req, res) => {
  Bookmark.findById(req.params.id)
    .then((bookmark) => res.json(bookmark))
    .catch((err) =>
      res
        .status(404)
        .json({ nobookmarkfound: "No bookmark found with that ID" })
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
      user: req.user.id,
    });
    newBookmark.save().then((bookmark) => res.json(bookmark));
    req.user.bookmarks.push(newBookmark);
    req.user.save();
    return newBookmark;
  }
);

//@route DELETE api/bookmarks/:id
//@desc Delete bookmark
//@access Private
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.findOne({ user: req.user.id }).then(() => {
      Bookmark.findById(req.params.id)
        .then((bookmark) => {
          if (bookmark.user.toString() != req.user.id) {
            return res
              .status(401)
              .json({ notauthorized: "User not authorized" });
          }
          //removing bookmark from user array
          req.user.bookmarks = req.user.bookmarks.filter((bookmark) => {
            if (bookmark != req.params.id) return bookmark;
          });
          req.user.save();
          //Deleting bookmark
          return bookmark.deleteOne().then(() => res.json({ success: true }));
        })
        .catch((err) => {
          console.log("err", err);
          res.status(404).json({ bookmarknotfound: "No bookmark found" });
        });
    });
  }
);

module.exports = router;
