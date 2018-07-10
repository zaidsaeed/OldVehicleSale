// Creating Schema
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const BookmarkSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  post: {
    type: Schema.Types.ObjectId,
    ref: "post"
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Bookmark = mongoose.model("bookmark", BookmarkSchema);
