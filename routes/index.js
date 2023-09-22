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

  const [list_topic] = await Promise.all([
    Topic.find().sort({ createdAt: -1 }).exec(),
  ]);
  res.render("index", { title: "The Depths", list_topic, options, topicId });
});

module.exports = router;
