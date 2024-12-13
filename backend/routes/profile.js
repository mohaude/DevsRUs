const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Profile = require('../models/Profile');

router.get('/me', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id }).populate('user', ['name', 'avatar']);
        if (!profile) return res.status(400).json({ msg: 'Profile not found' });
        res.json(profile);
    } catch (err) {
        res.status(500).send('Server error');
    }
});

router.post('/', auth, async (req, res) => {
    try {
        const profileFields = {
            user: req.user.id,
            bio: req.body.bio,
            skills: req.body.skills.split(',').map(skill => skill.trim()),
            social: req.body.social
        };
        let profile = await Profile.findOne({ user: req.user.id });
        if (profile) {
            profile = await Profile.findOneAndUpdate(
                { user: req.user.id },
                { $set: profileFields },
                { new: true }
            );
            return res.json(profile);
        }
        profile = new Profile(profileFields);
        await profile.save();
        res.json(profile);
    } catch (err) {
        res.status(500).send('Server error');
    }
});
module.exports = router; 
