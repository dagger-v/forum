const mongoose = require("mongoose");

// Create Topic Schema
const topicSchema = new mongoose.Schema({
  author: {
    type: String,
    ref: "User", // Reference to the user who made the Topic update
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Topic", topicSchema);
