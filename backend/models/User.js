const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatar: { type: String },
  bio: { type: String },
  skills: [String],
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);
