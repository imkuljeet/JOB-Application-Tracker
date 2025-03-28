const express = require('express');
const router = express.Router();

const addjobController = require('../controllers/addjob');
const Authorization = require('../middleware/auth');

const { Op } = require('sequelize');

router.get('/search-filter', Authorization, async (req, res) => {
    const { query, status } = req.query;

    try {
        const conditions = {
            userId: req.user.id
        };

        if (query) {
            conditions[Op.or] = [
                { title: { [Op.like]: `%${query}%` } },
                { company: { [Op.like]: `%${query}%` } }
            ];
        }
        if (status) {
            conditions.status = status;
        }

        const jobs = await Job.findAll({ where: conditions });
        res.status(200).json({ jobs });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to fetch jobs. Please try again.' });
    }
});

router.get('/filter', Authorization, async (req, res) => {
    const { status } = req.query; // Query parameter for filtering
    // console.log("STATUS>>>>",status);
    try {
        const jobs = await Job.findAll({
            where: {
                status,
                userId: req.user.id
            }
        });
        res.status(200).json({ jobs });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to filter jobs. Please try again.' });
    }
});

router.get('/search', Authorization, async (req, res) => {
    const { query } = req.query; // Query parameter for search
    try {
        const jobs = await Job.findAll({
            where: {
                [Op.or]: [
                    { title: { [Op.like]: `%${query}%` } },
                    { company: { [Op.like]: `%${query}%` } }
                ],
                userId: req.user.id
            }
        });
        res.status(200).json({ jobs });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to search jobs. Please try again.' });
    }
});

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

// Fetch job details
router.get('/:id', Authorization, async (req, res) => {
    try {
        const job = await Job.findOne({ where: { id: req.params.id, userId: req.user.id } });
        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }
        res.status(200).json({ job });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to fetch job details. Please try again.' });
    }
});

// Delete job
router.delete('/:id', Authorization, async (req, res) => {
    try {
        const result = await Job.destroy({ where: { id: req.params.id, userId: req.user.id } });
        if (result === 0) {
            return res.status(404).json({ message: 'Job not found' });
        }
        res.status(200).json({ message: 'Job deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to delete job. Please try again.' });
    }
});

// Update job
router.put('/:id', Authorization, async (req, res) => {
    const { company, title, date, notes, status } = req.body;

    try {
        const job = await Job.findOne({ where: { id: req.params.id, userId: req.user.id } });
        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }

        job.company = company;
        job.title = title;
        job.date = date;
        job.notes = notes;
        job.status = status;

        await job.save();

        res.status(200).json({ message: 'Job updated successfully', job });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to update job. Please try again.' });
    }
});

// routes/addjob.js





module.exports = router;
