const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Team = require('../models/Team');

router.post('/', auth, async (req, res) => {
    try {
        const newTeam = new Team({
            name: req.body.name,
            description: req.body.description,
            owner: req.user.id,
            members: [req.user.id]
        });
        const team = await newTeam.save();
        res.json(team);
    } catch (err) {
        res.status(500).send('Server error');
    }
});

router.get('/:teamname', async (req, res) => {
    try {
        const team = await Team.findOne({ name: req.params.teamname });
        if (!team) return res.status(404).json({ msg: 'Team not found' });
        res.json(team);
    } catch (err) {
        res.status(500).send('Server error');
    }
});
