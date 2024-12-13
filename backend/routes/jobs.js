const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Job = require('../models/Job');

router.post('/', auth, async (req, res) => {
    try {
        const newJob = new Job({
            title: req.body.title,
            company: req.body.company,
            description: req.body.description,
            requirements: req.body.requirements,
            postedBy: req.user.id
        });
        const job = await newJob.save();
        res.json(job);
    } catch (err) {
        res.status(500).send('Server error');
    }
});

router.get('/', async (req, res) => {
    try {
        const jobs = await Job.find().sort({ date: -1 });
        res.json(jobs);
    } catch (err) {
        res.status(500).send('Server error');
    }
});
module.exports = router; 
