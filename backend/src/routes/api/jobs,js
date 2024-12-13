const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const jobController = require('../../controllers/jobController');

// @route   POST api/jobs
// @desc    Create a new job listing
// @access  Private (Company/Team accounts only)
router.post('/', auth, jobController.createJob);

// @route   GET api/jobs
// @desc    Get all jobs with filters (location, type, skills)
// @access  Public
router.get('/', jobController.getAllJobs);

// @route   GET api/jobs/:id
// @desc    Get job by ID
// @access  Public
router.get('/:id', jobController.getJobById);

// @route   PUT api/jobs/:id
// @desc    Update job listing
// @access  Private (Job Creator only)
router.put('/:id', auth, jobController.updateJob);

// @route   DELETE api/jobs/:id
// @desc    Delete job listing
// @access  Private (Job Creator only)
router.delete('/:id', auth, jobController.deleteJob);

// @route   POST api/jobs/:id/apply
// @desc    Apply for a job
// @access  Private
router.post('/:id/apply', auth, jobController.applyForJob);

// @route   GET api/jobs/:id/applications
// @desc    Get all applications for a job
// @access  Private (Job Creator only)
router.get('/:id/applications', auth, jobController.getJobApplications);

// @route   PUT api/jobs/:id/applications/:applicationId
// @desc    Update application status
// @access  Private (Job Creator only)
router.put('/:id/applications/:applicationId', auth, jobController.updateApplicationStatus);

// @route   GET api/jobs/applied
// @desc    Get all jobs user has applied to
// @access  Private
router.get('/applied', auth, jobController.getUserApplications);

// @route   POST api/jobs/:id/save
// @desc    Save/Unsave job
// @access  Private
router.post('/:id/save', auth, jobController.toggleSaveJob);

module.exports = router;
