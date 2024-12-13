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
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  members: [{
    user: {
      type: Schema.Types.ObjectId,
      ref: 'user'
    },
    role: {
      type: String,
      enum: ['owner', 'admin', 'member'],
      default: 'member'
    },
    joinedAt: {
      type: Date,
      default: Date.now
    }
  }],
  projects: [{
    title: String,
    description: String,
    technologies: [String],
    repoLink: String,
    demoLink: String,
    thumbnail: String
  }],
  openPositions: [{
    title: String,
    description: String,
    requirements: [String],
    type: {
      type: String,
      enum: ['full-time', 'part-time', 'contract', 'internship']
    }
  }],
  socialLinks: {
    github: String,
    website: String,
    linkedin: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// This will create the team URL slug
TeamSchema.virtual('teamUrl').get(function() {
  return `/${this.name.toLowerCase().replace(/\s+/g, '-')}`;
});

module.exports = Team = mongoose.model('team', TeamSchema);
