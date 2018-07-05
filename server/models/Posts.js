// Creating Schema
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
require("mongoose-type-url");

// Create Schema
const PostSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  model: {
    type: String
  },
  description: {
    type: String,
    required: true
  },
  imageURL: {
    type: mongoose.SchemaTypes.Url
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Post = mongoose.model("post", PostSchema);
