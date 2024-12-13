const mongoose = require('mongoose');

const TeamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  members: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    role: {
      type: String,
      enum: ['owner', 'admin', 'member'],
      default: 'member'
    }
  }],
  description: {
    type: String,
    required: true
  },
  website: {
    type: String
  },
  projects: [{
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    repoUrl: {
      type: String
    },
    liveUrl: {
      type: String
    },
    technologies: [{
      type: String
    }],
    images: [{
      type: String
    }]
  }],
  jobListings: [{
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    requirements: [{
      type: String
    }],
    type: {
      type: String,
      enum: ['full-time', 'part-time', 'contract', 'internship'],
      required: true
    },
    location: {
      type: String,
      required: true
    },
    salary: {
      type: String
    },
    status: {
      type: String,
      enum: ['open', 'closed'],
      default: 'open'
    }
  }],
  social: {
    github: String,
    linkedin: String,
    twitter: String,
    website: String
  }
}, {
  timestamps: true
});

// Create URL-friendly slug from team name
TeamSchema.pre('save', function(next) {
  if (this.isModified('name')) {
    this.slug = this.name.toLowerCase().replace(/[^a-zA-Z0-9]/g, '-');
  }
  next();
});

module.exports = mongoose.model('Team', TeamSchema);
