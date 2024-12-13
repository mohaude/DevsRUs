const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const Team = require('../../models/Team');
const User = require('../../models/User');

// @route    POST api/teams
// @desc     Create a team
// @access   Private
router.post(
  '/',
  [
    auth,
    [
      check('name', 'Team name is required').not().isEmpty(),
      check('description', 'Description is required').not().isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select('-password');
      
      const newTeam = new Team({
        name: req.body.name,
        description: req.body.description,
        leader: req.user.id,
        members: [req.user.id],
        projects: [],
        jobs: []
      });

      const team = await newTeam.save();
      res.json(team);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
