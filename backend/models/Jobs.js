const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const JobSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  company: {
    type: String,
    required: true
  },
  postedBy: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  team: {
    type: Schema.Types.ObjectId,
    ref: 'team'
  },
  description: {
    type: String,
    required: true
  },
  requirements: [{
    type: String,
    required: true
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
  remote: {
    type: Boolean,
    default: false
  },
  salary: {
    min: Number,
    max: Number,
    currency: {
      type: String,
      default: 'USD'
    }
  },
  applicationUrl: String,
  skills: [{
    type: String
  }],
  experience: {
    min: Number,
    max: Number
  },
  status: {
    type: String,
    enum: ['open', 'closed', 'draft'],
    default: 'open'
  },
  applicants: [{
    user: {
      type: Schema.Types.ObjectId,
      ref: 'user'
    },
    status: {
      type: String,
      enum: ['pending', 'reviewed', 'accepted', 'rejected'],
      default: 'pending'
    },
    appliedAt: {
      type: Date,
      default: Date.now
    }
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt timestamp on save
JobSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = Job = mongoose.model('job', JobSchema);
