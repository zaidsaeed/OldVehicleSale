const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Creating Schema
const PostSchema = new Schema({
  user: {
    type: Schema.Type.ObjectId,
    ref: "users"
  },
  text: {
    type: String,
    required: true
  },
  name: {
    type: String
  },
  avatar: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.export = Post = mongoose.model("post", PostSchema);
