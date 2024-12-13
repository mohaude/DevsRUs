const mongoose = require('mongoose');

const TeamSchema = new mongoose.Schema({
  name: { type: String, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  description: { type: String },
  projects: [{
    title: { type: String },
    description: { type: String },
    link: { type: String }
  }],
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Team', TeamSchema);
