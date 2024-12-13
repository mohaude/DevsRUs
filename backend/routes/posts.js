const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const auth = require('../middleware/auth');

router.post('/', auth, async (req, res) => {
  try {
    const newPost = new Post({
      text: req.body.text,
      name: req.user.name,
      avatar: req.user.avatar,
      user: req.user.id
    });
    const post = await newPost.save();
    res.json(post);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

module.exports = router;
