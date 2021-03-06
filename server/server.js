const express = require("express");

const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const passport = require("passport");

const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const posts = require("./routes/api/posts");
const bookmarks = require("./routes/api/bookmarks");

const app = express();

//Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//DB Config
const db = require("./config/keys").mongoURI;

//Connect to MongoDb
mongoose
  .connect(db)
  .then(() => console.log("MongoDbConnected"))
  .catch(err => console.log(err));

//Passport middlewear
app.use(passport.initialize());

//Passport Config
require("./config/passport.js")(passport);

//Use Routes
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);
app.use("/api/bookmarks", bookmarks);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
