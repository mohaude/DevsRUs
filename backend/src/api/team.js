const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const teamController = require('../../controllers/teamController');
const upload = require('../../middleware/upload');

// @route   POST api/teams
// @desc    Create a new development team
// @access  Private
router.post('/', [auth, upload.single('logo')], teamController.createTeam);

// @route   GET api/teams
// @desc    Get all teams with filters
// @access  Public
router.get('/', teamController.getAllTeams);

// @route   GET api/teams/:teamName
// @desc    Get team by custom URL
// @access  Public
router.get('/:teamName', teamController.getTeamByName);

// @route   PUT api/teams/:id
// @desc    Update team profile
// @access  Private (Team Admin only)
router.put('/:id', [auth, upload.single('logo')], teamController.updateTeam);

// @route   DELETE api/teams/:id
// @desc    Delete team
// @access  Private (Team Admin only)
router.delete('/:id', auth, teamController.deleteTeam);

// @route   POST api/teams/:id/members
// @desc    Add team member
// @access  Private (Team Admin only)
router.post('/:id/members', auth, teamController.addMember);

// @route   DELETE api/teams/:id/members/:userId
// @desc    Remove team member
// @access  Private (Team Admin only)
router.delete('/:id/members/:userId', auth, teamController.removeMember);

// @route   POST api/teams/:id/projects
// @desc    Add team project
// @access  Private (Team Members only)
router.post('/:id/projects', [auth, upload.array('projectImages', 5)], teamController.addProject);

// @route   PUT api/teams/:id/projects/:projectId
// @desc    Update team project
// @access  Private (Team Members only)
router.put('/:id/projects/:projectId', auth, teamController.updateProject);

// @route   DELETE api/teams/:id/projects/:projectId
// @desc    Delete team project
// @access  Private (Team Members only)
router.delete('/:id/projects/:projectId', auth, teamController.deleteProject);

module.exports = router;
