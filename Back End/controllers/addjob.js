const Job = require('../models/jobs');

const addjob = async (req, res, next) => {
    const { company, title, date, notes } = req.body;

    try {
        const newJob = await Job.create({
            company: company,
            title: title,
            date: date,
            notes: notes
        });

        res.status(201).json({ message: 'Job added successfully!', job: newJob });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to add job. Please try again.' });
    }
};

module.exports = { addjob };