const Chat = require('../models/Chat');
const Message = require('../models/Message');
const User = require('../models/User');

exports.getConversations = async (req, res) => {
  try {
    const conversations = await Chat.find({ participants: req.user._id })
      .populate('participants', 'name avatar title')
      .sort('-updatedAt');
    
    res.status(200).json({
      success: true,
      data: conversations
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

exports.getMessages = async (req, res) => {
  try {
    const { chatId } = req.params;
    const messages = await Message.find({ chat: chatId })
      .populate('sender', 'name avatar')
      .sort('createdAt');

    res.status(200).json({
      success: true,
      data: messages
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

exports.sendMessage = async (req, res) => {
  try {
    const { chatId } = req.params;
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({
        success: false,
        error: 'Message content is required'
      });
    }

    const chat = await Chat.findById(chatId);
    if (!chat) {
      return res.status(404).json({
        success: false,
        error: 'Chat not found'
      });
    }

    // Verify user is participant in chat
    if (!chat.participants.includes(req.user._id)) {
      return res.status(403).json({
        success: false,
        error: 'Not authorized to send messages in this chat'
      });
    }

    const message = await Message.create({
      chat: chatId,
      sender: req.user._id,
      content
    });

    // Update chat's lastMessage and timestamp
    chat.lastMessage = message._id;
    chat.updatedAt = Date.now();
    await chat.save();

    const populatedMessage = await Message.findById(message._id)
      .populate('sender', 'name avatar');

    // Emit socket event for real-time updates
    req.io.to(chatId).emit('newMessage', populatedMessage);

    res.status(201).json({
      success: true,
      data: populatedMessage
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

exports.createChat = async (req, res) => {
  try {
    const { participantId } = req.body;

    // Check if chat already exists between these users
    const existingChat = await Chat.findOne({
      participants: { $all: [req.user._id, participantId] }
    });

    if (existingChat) {
      return res.status(200).json({
        success: true,
        data: existingChat
      });
    }

    // Create new chat
    const chat = await Chat.create({
      participants: [req.user._id, participantId]
    });

    const populatedChat = await Chat.findById(chat._id)
      .populate('participants', 'name avatar title');

    res.status(201).json({
      success: true,
      data: populatedChat
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

exports.deleteChat = async (req, res) => {
  try {
    const { chatId } = req.params;
    
    const chat = await Chat.findById(chatId);
    if (!chat) {
      return res.status(404).json({
        success: false,
        error: 'Chat not found'
      });
    }

    // Verify user is participant in chat
    if (!chat.participants.includes(req.user._id)) {
      return res.status(403).json({
        success: false,
        error: 'Not authorized to delete this chat'
      });
    }

    // Delete all messages in chat
    await Message.deleteMany({ chat: chatId });
    
    // Delete chat
    await chat.remove();

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};
