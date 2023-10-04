const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const uniqueValidator = require("mongoose-unique-validator");

// Create User Schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: [true, "can't be blank"],
    match: [/^[a-zA-Z0-9]+$/, "is invalid"],
    index: true,
  },
  password: String,
  signature: {
    type: String,
    default: "",
  },
  guild: { type: String, default: "(none)" },
  avatar: { type: String, default: "default" },
  banner: { type: String, default: "default" },
  activePosts: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

// hash password
userSchema.plugin(passportLocalMongoose);

// check if username / email is taken
userSchema.plugin(uniqueValidator, { message: "is already taken." });

module.exports = mongoose.model("User", userSchema);
