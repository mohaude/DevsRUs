const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  content: {
    type: String,
    required: true
  },
  attachments: [{
    type: String
  }],
  readBy: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    readAt: {
      type: Date,
      default: Date.now
    }
  }]
}, {
  timestamps: true
});

const ChatSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['direct', 'group'],
    required: true
  },
  participants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  messages: [MessageSchema],
  lastMessage: {
    type: MessageSchema,
    default: null
  },
  name: {
    type: String,
    // Required only for group chats
    required: function() {
      return this.type === 'group';
    }
  },
  admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    // Required only for group chats
    required: function() {
      return this.type === 'group';
    }
  }
}, {
  timestamps: true
});

// Middleware to update lastMessage when a new message is added
ChatSchema.pre('save', function(next) {
  if (this.messages.length > 0) {
    this.lastMessage = this.messages[this.messages.length - 1];
  }
  next();
});

module.exports = mongoose.model('Chat', ChatSchema);
