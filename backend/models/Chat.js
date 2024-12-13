const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ChatSchema = new Schema({
  participants: [{
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true
  }],
  messages: [{
    sender: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true
    },
    content: {
      type: String,
      required: true
    },
    timestamp: {
      type: Date,
      default: Date.now
    },
    read: {
      type: Boolean,
      default: false
    }
  }],
  chatName: {
    type: String
  },
  isGroupChat: {
    type: Boolean,
    default: false
  },
  lastMessage: {
    type: Date,
    default: Date.now
  }
});

module.exports = Chat = mongoose.model('chat', ChatSchema);
