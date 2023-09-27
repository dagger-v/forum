var express = require("express");
var router = express.Router();

/* SETTINGS LISTINGS */
router.get("/settings/signature", function (req, res, next) {
  res.render("signature", { title: "Yūgen Clan" });
});

/* PROFILE LISTINGS */
router.get("/profile", function (req, res, next) {
  res.render("profile", { title: "Yūgen Clan" });
});

module.exports = router;
