const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const teamController = require('../../controllers/teamController');
const upload = require('../../middleware/upload');

// @route   POST api/teams
// @desc    Create a new team
// @access  Private
router.post('/', [auth, upload.single('avatar')], teamController.createTeam);

// @route   GET api/teams
// @desc    Get all teams with pagination and filters
// @access  Public
router.get('/', teamController.getAllTeams);

// @route   GET api/teams/:slug
// @desc    Get team by slug
// @access  Public
router.get('/:slug', teamController.getTeamBySlug);

// @route   PUT api/teams/:id
// @desc    Update team
// @access  Private (Team Owner/Admin only)
router.put('/:id', [auth, upload.single('avatar')], teamController.updateTeam);

// @route   DELETE api/teams/:id
// @desc    Delete team
// @access  Private (Team Owner only)
router.delete('/:id', auth, teamController.deleteTeam);

// @route   POST api/teams/:id/members
// @desc    Add team member
// @access  Private (Team Owner/Admin only)
router.post('/:id/members', auth, teamController.addMember);

// @route   DELETE api/teams/:id/members/:userId
// @desc    Remove team member
// @access  Private (Team Owner/Admin only)
router.delete('/:id/members/:userId', auth, teamController.removeMember);

// @route   PUT api/teams/:id/members/:userId/role
// @desc    Update member role
// @access  Private (Team Owner only)
router.put('/:id/members/:userId/role', auth, teamController.updateMemberRole);

// @route   POST api/teams/:id/projects
// @desc    Add team project
// @access  Private (Team Members)
router.post('/:id/projects', [auth, upload.single('projectImage')], teamController.addProject);

// @route   PUT api/teams/:id/projects/:projectId
// @desc    Update team project
// @access  Private (Team Members)
router.put('/:id/projects/:projectId', auth, teamController.updateProject);

// @route   DELETE api/teams/:id/projects/:projectId
// @desc    Delete team project
// @access  Private (Team Members)
router.delete('/:id/projects/:projectId', auth, teamController.deleteProject);

module.exports = router;
