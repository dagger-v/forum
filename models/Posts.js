const mongoose = require("mongoose");

// Create Posts Schema
const postsSchema = new mongoose.Schema({
  author: {
    type: String,
    ref: "User", // Reference to the user who made the Posts update
    required: true,
  },
  topic: { type: String, ref: "Topic" },
  message: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Posts", postsSchema);
