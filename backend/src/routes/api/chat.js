const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const chatController = require('../../controllers/chatController');

// @route   POST api/chat/room
// @desc    Create or get direct message room
// @access  Private
router.post('/room', auth, chatController.createRoom);

// @route   GET api/chat/rooms
// @desc    Get all chat rooms for a user
// @access  Private
router.get('/rooms', auth, chatController.getUserRooms);

// @route   GET api/chat/room/:roomId/messages
// @desc    Get messages for a specific room
// @access  Private
router.get('/room/:roomId/messages', auth, chatController.getRoomMessages);

// @route   POST api/chat/room/:roomId/message
// @desc    Send a message in a room
// @access  Private
router.post('/room/:roomId/message', auth, chatController.sendMessage);

// @route   DELETE api/chat/room/:roomId/message/:messageId
// @desc    Delete a message
// @access  Private
router.delete('/room/:roomId/message/:messageId', auth, chatController.deleteMessage);

module.exports = router;
