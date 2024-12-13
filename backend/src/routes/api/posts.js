const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const postController = require('../../controllers/postController');
const upload = require('../../middleware/upload');

// @route   POST api/posts
// @desc    Create a post
// @access  Private
router.post('/', [auth, upload.single('image')], postController.createPost);

// @route   GET api/posts
// @desc    Get all posts with pagination
// @access  Private
router.get('/', auth, postController.getAllPosts);

// @route   GET api/posts/:id
// @desc    Get post by ID
// @access  Private
router.get('/:id', auth, postController.getPostById);

// @route   PUT api/posts/:id
// @desc    Update post
// @access  Private
router.put('/:id', auth, postController.updatePost);

// @route   DELETE api/posts/:id
// @desc    Delete post
// @access  Private
router.delete('/:id', auth, postController.deletePost);

// @route   POST api/posts/:id/like
// @desc    Like/Unlike a post
// @access  Private
router.post('/:id/like', auth, postController.toggleLike);

// @route   POST api/posts/:id/comment
// @desc    Comment on a post
// @access  Private
router.post('/:id/comment', auth, postController.addComment);

// @route   DELETE api/posts/:id/comment/:commentId
// @desc    Delete comment
// @access  Private
router.delete('/:id/comment/:commentId', auth, postController.deleteComment);

module.exports = router;
