const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  sender: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  content: {
    type: String,
    required: true
  },
  attachments: [{
    type: String // URLs to attached files
  }],
  readBy: [{
    user: {
      type: Schema.Types.ObjectId,
      ref: 'user'
    },
    readAt: {
      type: Date,
      default: Date.now
    }
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const ChatSchema = new Schema({
  participants: [{
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true
  }],
  messages: [MessageSchema],
  type: {
    type: String,
    enum: ['direct', 'group'],
    required: true
  },
  name: { // For group chats
    type: String
  },
  lastActivity: {
    type: Date,
    default: Date.now
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Update lastActivity when new message is added
ChatSchema.pre('save', function(next) {
  this.lastActivity = Date.now();
  next();
});

module.exports = Chat = mongoose.model('chat', ChatSchema);
