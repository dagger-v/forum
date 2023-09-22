const mongoose = require("mongoose");

// Create Topic Schema
const topicSchema = new mongoose.Schema({
  author: {
    type: String,
    ref: "User", // Reference to the user who made the Topic update
    required: true,
  },
  title: { type: String, required: true },
  content: {
    type: String,
    required: true,
  },
  posts: { type: String, ref: "Posts" },
  postCount: { type: Number, default: 1, required: true },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Topic", topicSchema);
