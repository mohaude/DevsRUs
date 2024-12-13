const express = require('express');
const router = express.Router();
const Team = require('../models/Team');
const auth = require('../middleware/auth');

router.post('/', auth, async (req, res) => {
  try {
    const newTeam = new Team({
      name: req.body.name,
      owner: req.user.id,
      description: req.body.description
    });
    const team = await newTeam.save();
    res.json(team);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

module.exports = router;
