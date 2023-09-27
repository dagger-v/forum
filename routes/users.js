var express = require("express");
var router = express.Router();

/* SETTINGS LISTINGS */
router.get("/settings", function (req, res, next) {
  const user = req.user;
  res.render("settings", { title: "Yūgen Clan", user });
});

router.get("/settings/signature", function (req, res, next) {
  res.render("signature", { title: "Yūgen Clan" });
});

/* PROFILE LISTINGS */
router.get("/:user", function (req, res, next) {
  res.render("profile", { title: "Yūgen Clan" });
});

module.exports = router;
