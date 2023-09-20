var express = require("express");
var router = express.Router();

const Topic = require("../models/Topic");

const { body, validationResult } = require("express-validator");

const he = require("he");

/* GET users listing. */
router.get("/post", function (req, res, next) {
  const user = req.user;
  res.render("topic", { title: "The Depths", user });
});

router.post("/post", [
  // Validate and sanitize fields.
  body("content", "Content must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  // Process request after validation and sanitization.
  (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Access the text content from the form
    const text = req.body.content;

    // Decode the text content using he library
    const decodedText = he.decode(text);

    // Create an article object with escaped and trimmed data.
    const topic = new Topic({
      title: req.body.title,
      content: decodedText,
      author: req.body.author,
    });

    if (!errors.isEmpty()) {
      // Get all authors and genres for form.
      async.parallel((err, results) => {
        if (err) {
          return next(err);
        }
        res.render("post", {
          author: author.username,
          title: title,
          content: content,
          errors: errors.array(),
        });
      });
      return;
    }

    // Data from form is valid. Save statue update.
    topic
      .save()
      .then(function (topic) {
        console.log(topic);
        res.redirect("/");
      })
      .catch(function (err) {
        console.log(err);
      });
  },
]);

module.exports = router;
