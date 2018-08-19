/*
    User model for Database. Look into using async functions for bcrypt as they are less taxing on DB server.
 */

const mongoose = require("mongoose");
const bcrypt = require("bcrypt-nodejs");
const URLSlugs = require("mongoose-url-slugs");

const Schema = mongoose.Schema;

// USE POPULATE IN THE MONGO SHELL TO POPULATE ENTRIES WITH FRIENDS INSTEAD OF THE IDS.

const userSchema = new Schema({
  local: {
    firstname: String,
    lastname: String,
    username: { type: String, unique: true },
    username_lower: { type: String },
    email: { type: String, unique: true },
    password: String,
    friends: [{ type: Schema.Types.ObjectId, ref: "User" }],
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    secretToken: String,
    confirmed: {type: Boolean, default: false},
  }
});

// default field for the slug is "slug"
userSchema.plugin(URLSlugs("local.username"));

userSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model("User", userSchema);
