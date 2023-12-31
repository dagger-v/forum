var express = require("express");
var router = express.Router();

const { ObjectId } = require("mongodb");

const User = require("../models/User");
const Topic = require("../models/Topic");
const Post = require("../models/Posts");

const { body, validationResult } = require("express-validator");

const async = require("async");

const he = require("he");

/* GET users listing. */
router.get("/post", function (req, res, next) {
  const user = req.user;
  console.log(user.signature);
  res.render("post", { title: "The Depths", user });
});

router.post("/post", [
  // Validate and sanitize fields.
  body("content", "Content must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  // Process request after validation and sanitization.
  async (req, res, next) => {
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
      signature: req.body.signature,
      guild: req.body.guild,
      avatar: req.body.avatar,
    });
    const user = await User.findOne({ username: topic.author });
    user.activePosts += 1;
    await user.save();

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
          signature: signature,
          guild: guild,
          errors: errors.array(),
        });
      });
      return;
    }

    // Data from form is valid. Save statue update.
    topic
      .save()
      .then(function (topic) {
        res.redirect("/");
      })
      .catch(function (err) {
        console.log(err);
      });
  },
]);

router.get("/:topicId", async function (req, res, next) {
  const { topicId } = req.params;
  const month = {
    month: "short",
    day: "numeric",
    year: "numeric",
  };

  const [list_posts] = await Promise.all([
    Topic.find({ _id: new ObjectId(topicId) }).exec(),
  ]);

  const topic = await Topic.findById(req.params.id).populate({
    path: "posts",
    options: { sort: { createdAt: 1 } }, // Sort posts by createdAt in ascending order
  });

  res.render("topic", {
    title: "The Depths",
    topicId,
    list_posts,
    topic,
    month,
  });
});

router.post("/:topicId", async function (req, res, next) {
  const { topicId } = req.params;
  // Extract the validation errors from a request.
  const errors = validationResult(req);

  // Access the text content from the form
  const text = req.body.message;

  // Decode the text content using he library
  const decodedText = he.decode(text);

  const topic = await Topic.findById(topicId);

  const post = new Post({
    author: req.body.author,
    message: decodedText,
    topic: topic,
    signature: req.body.signature,
    guild: req.body.guild,
    avatar: req.body.avatar,
  });

  topic.postCount += 1;
  await topic.save();

  const user = await User.findOne({ username: post.author });
  user.activePosts += 1;
  await user.save();
  console.log(post);
  console.log(topic.posts);

  topic.posts.push(post);
  await topic.save();

  // Data from form is valid. Save statue update.
  post
    .save()
    .then(function (post) {
      res.redirect(`/board/${topicId}`);
    })
    .catch(function (err) {
      console.log(err);
    });
});

module.exports = router;
