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
    handle: {
      type: String
    },
    name: {
      type: String
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
  },
  price: {
    type: Number,
      required: true
  }
});

module.exports = Post = mongoose.model("post", PostSchema);
