var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/settings/signature", function (req, res, next) {
  res.render("signature", { title: "Yūgen Clan" });
});

module.exports = router;
