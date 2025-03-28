// routes/reminder.js
const express = require('express');
const router = express.Router();
const Reminder = require('../models/reminder');
const Authorization = require('../middleware/auth');

router.post('/set-reminder', Authorization, async (req, res) => {
    const { date, message } = req.body;

    try {
        const newReminder = await Reminder.create({
            date,
            message,
            userId: req.user.id
        });
        res.status(201).json({ message: 'Reminder set successfully!', reminder: newReminder });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to set reminder. Please try again.' });
    }
});

router.get('/get-reminders', Authorization, async (req, res) => {
    try {
        const reminders = await Reminder.findAll({ where: { userId: req.user.id } });
        res.status(200).json({ reminders });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to fetch reminders. Please try again.' });
    }
});

router.delete('/delete-reminder/:id', Authorization, async (req, res) => {
    try {
        const result = await Reminder.destroy({ where: { id: req.params.id, userId: req.user.id } });
        if (result === 0) {
            return res.status(404).json({ message: 'Reminder not found' });
        }
        res.status(200).json({ message: 'Reminder deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to delete reminder. Please try again.' });
    }
});

module.exports = router;
