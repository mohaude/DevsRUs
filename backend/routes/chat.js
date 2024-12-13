const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Chat = require('../models/Chat');

router.post('/', auth, async (req, res) => {
    try {
        const newMessage = new Chat({
            sender: req.user.id,
            receiver: req.body.receiver,
            message: req.body.message
        });
        const message = await newMessage.save();
        res.json(message);
    } catch (err) {
        res.status(500).send('Server error');
    }
});

router.get('/:userId', auth, async (req, res) => {
    try {
        const messages = await Chat.find({
            $or: [
                { sender: req.user.id, receiver: req.params.userId },
                { sender: req.params.userId, receiver: req.user.id }
            ]
        }).sort({ date: 1 });
        res.json(messages);
    } catch (err) {
        res.status(500).send('Server error');
    }
});

module.exports = router; 
