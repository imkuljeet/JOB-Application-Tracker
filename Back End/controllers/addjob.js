const Job = require('../models/jobs');

const addjob = async (req, res) => {
    const { company, title, date, notes } = req.body;

    try {
        const newJob = await Job.create({
            company,
            title,
            date,
            notes,
            userId: req.user.id // Assumes you have a userId field in your Job model
        });

        res.status(201).json({ message: 'Job added successfully!', job: newJob });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to add job. Please try again.' });
    }
};

module.exports = { addjob };