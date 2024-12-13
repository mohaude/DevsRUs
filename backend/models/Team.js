const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TeamSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  },
  leader: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  members: [{
    type: Schema.Types.ObjectId,
    ref: 'user'
  }],
  projects: [{
    name: {
      type: String,
      required: true
    },
    description: String,
    link: String,
    date: {
      type: Date,
      default: Date.now
    }
  }],
  jobs: [{
    title: {
      type: String,
      required: true
    },
    description: String,
    requirements: [String],
    date: {
      type: Date,
      default: Date.now
    }
  }],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Team = mongoose.model('team', TeamSchema);
