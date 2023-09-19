var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "The Depths" });
});

router.get("/:id", function (req, res, next) {
  const id = req.params.id;
  res.render("topic", { title: "The Depths", id });
});

module.exports = router;
