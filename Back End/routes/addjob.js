const express = require('express');
const router = express.Router();

const addjobController = require('../controllers/addjob');
const Authorization = require('../middleware/auth');

router.use('/add-job', Authorization, addjobController.addjob);
// Add this route in your addjob controller or routes file

const Job = require('../models/jobs');

router.get('/applications', Authorization, async (req, res) => {
    try {
        const jobs = await Job.findAll({ where: { userId: req.user.id } });
        res.status(200).json({ jobs });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to fetch job applications. Please try again.' });
    }
});

module.exports = router;
