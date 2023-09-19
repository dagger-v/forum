var express = require("express");
var router = express.Router();

const User = require("../models/User");

const passport = require("passport");

// create passport local strategy
passport.use(User.createStrategy());

// Serialize and deserialize user
passport.serializeUser(function (user, cb) {
  process.nextTick(function () {
    cb(null, {
      id: user.id,
      username: user.username,
      signature: user.signature,
      createdAt: user.createdAt,
    });
  });
});

passport.deserializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, user);
  });
});

/* GET users listing. */

router.get("/register", (req, res) => {
  if (req.isAuthenticated()) {
    res.redirect("/");
  } else {
    res.render("register", { title: "Taka" });
  }
});

router.get("/login", (req, res) => {
  if (req.isAuthenticated()) {
    res.redirect("/");
  } else {
    res.render("login", { title: "Taka" });
  }
});

// Register user in DB
router.post("/register", async (req, res) => {
  try {
    // Register user
    const registerUser = await User.register(
      {
        firstname: req.body.firstname,
        username: req.body.username,
        signature: "",
      },
      req.body.password
    );
    if (registerUser) {
      passport.authenticate("local")(req, res, function () {
        res.redirect("/");
      });
    } else {
      res.redirect("/register");
    }
  } catch (err) {
    res.send(err);
  }
});

// Login user
router.post("/login", (req, res) => {
  // Create new user object
  const user = new User({
    username: req.body.username,
    password: req.body.password,
  });

  // Using passport will check credentials
  req.login(user, (err) => {
    if (err) {
      console.log(err);
    } else {
      passport.authenticate("local")(req, res, function () {
        res.redirect("/");
      });
    }
  });
});

// Logout user
router.get("/logout", (req, res) => {
  // Use passport logout method
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

module.exports = router;
