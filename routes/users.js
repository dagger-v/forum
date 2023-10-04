var express = require("express");
var router = express.Router();
const multer = require("multer");

const User = require("../models/User");

const { body, validationResult } = require("express-validator");

const he = require("he");

//Configuration for Multer
const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images/");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    const user = req.user.username;
    cb(null, `${file.fieldname}-${user.toLowerCase()}.${ext}`);
  },
});

const multerFilter = (req, file, cb) => {
  if (file.mimetype.split("/")[1] === "png") {
    cb(null, true);
  } else {
    cb(new Error("Not a .PNG File!!"), false);
  }
};

//Calling the "multer" Function
const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

/* SETTINGS LISTINGS */
router.get("/settings", function (req, res, next) {
  const user = req.user;
  res.render("settings", { title: "Yūgen Clan", user });
});

router.get("/settings/signature", function (req, res, next) {
  res.render("signature", { title: "Yūgen Clan" });
});

router.post("/settings/signature", function (req, res, next) {
  const newSignature = req.body.signature;
  const userId = req.user.id;

  // Update the user's signature in the database
  User.findByIdAndUpdate(userId, { signature: newSignature }, { new: true })
    .then((user) => {
      if (!user) {
        return res.status(404).send("User not found");
      }

      res.redirect("/users/settings/signature");
    })
    .catch((error) => {
      console.error("Error updating signature:", error);
      res.status(500).send("Internal Server Error");
    });
});

router.get("/settings/avatar", function (req, res, next) {
  res.render("avatar", { title: "Yūgen Clan" });
});

router.post("/settings/avatar", upload.single("avatar"), async (req, res) => {
  try {
    const userId = req.user.id;
    const username = req.user.username;

    const user = await User.findById(userId);
    user.avatar = username.toLowerCase();
    await user.save();

    res.redirect("/users/settings");
  } catch (error) {
    res.status(500).json({
      error: "An error occurred while uploading the profile picture",
    });
  }
});

router.get("/settings/banner", (req, res) => {
  res.render("banner", { title: "Yūgen Clan" });
});

router.post("/settings/banner", upload.single("banner"), async (req, res) => {
  try {
    const userId = req.user.id;
    const username = req.user.username;

    const user = await User.findById(userId);
    user.banner = username.toLowerCase();
    await user.save();

    res.redirect("/users/settings");
  } catch (error) {
    res.status(500).json({
      error: "An error occurred while uploading the profile picture",
    });
  }
});

router.get("/settings/guild", function (req, res, next) {
  res.render("guild", { title: "Yūgen Clan" });
});

router.post("/settings/guild", function (req, res, next) {
  const newguild = req.body.guild;
  const userId = req.user.id;

  // Update the user's guild in the database
  User.findByIdAndUpdate(userId, { guild: newguild }, { new: true })
    .then((user) => {
      if (!user) {
        return res.status(404).send("User not found");
      }

      res.redirect("/users/settings/guild");
    })
    .catch((error) => {
      console.error("Error updating guild:", error);
      res.status(500).send("Internal Server Error");
    });
});

/* PROFILE LISTINGS */
router.get("/:username", async function (req, res, next) {
  const username = req.params.username;
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  };

  const getUser = await User.findOne({ username: username });

  res.render("profile", { title: "Yūgen Clan", getUser, options });
});

module.exports = router;
