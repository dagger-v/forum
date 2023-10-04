var express = require("express");
var router = express.Router();

const Topic = require("../models/Topic");

const async = require("async");

/* GET home page. */
router.get("/", async function (req, res, next) {
  const topicId = req.params.id;
  const options = {
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  };

  const page = parseInt(req.query.page) || 1; // Get the requested page (default to 1)
  const limit = parseInt(req.query.limit) || 10; // Get the number of posts per page (default to 10)

  const skip = (page - 1) * limit; // Calculate the number of documents to skip

  const totalTopics = await Topic.countDocuments(); // Get the total number of topics

  const list_topic = await Topic.find()
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 })
    .exec();

  const totalPages = Math.ceil(totalTopics / limit); // Calculate the total number of pages

  res.render("index", {
    title: "The Depths",
    list_topic,
    options,
    topicId,
    currentPage: page,
    totalPages,
    limit,
  });
});

module.exports = router;
