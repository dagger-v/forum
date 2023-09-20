var express = require("express");
var router = express.Router();

const Topic = require("../models/Topic");

const async = require("async");

/* GET home page. */
router.get("/", async function (req, res, next) {
  const [list_topic] = await Promise.all([
    Topic.find().sort({ createdAt: -1 }).exec(),
  ]);
  res.render("index", { title: "The Depths", list_topic });
});

router.get("/:id", function (req, res, next) {
  const id = req.params.id;
  res.render("topic", { title: "The Depths", id });
});

module.exports = router;
