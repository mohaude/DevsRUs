const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const chatController = require('../../controllers/chatController');

// @route   POST api/chat
// @desc    Create new chat
// @access  Private
router.post('/', auth, chatController.createChat);

// @route   GET api/chat
// @desc    Get user's chats
// @access  Private
router.get('/', auth, chatController.getUserChats);

// @route   GET api/chat/:chatId/messages
// @desc    Get chat messages
// @access  Private
router.get('/:chatId/messages', auth, chatController.getChatMessages);

// @route   POST api/chat/:chatId/messages
// @desc    Send message in chat
// @access  Private
router.post('/:chatId/messages', auth, chatController.sendMessage);

// @route   DELETE api/chat/:chatId
// @desc    Delete chat
// @access  Private
router.delete('/:chatId', auth, chatController.deleteChat);

module.exports = router;
