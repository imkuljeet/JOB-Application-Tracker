// controllers/company.js
const Company = require('../models/company');

const Job = require('../models/jobs');
// const Company = require('../models/company');

exports.addCompany = async (req, res, next) => {
    const { jobId, contactDetails, companySize, industry, notes } = req.body;

    try {
        // Fetch the job by ID
        const job = await Job.findByPk(jobId);
        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }

        // Create a new company entry with the job's company name
        const newCompany = await Company.create({
            contactDetails,
            companySize,
            industry,
            notes,
            userId: req.user.id,
            jobId: job.id
        });

        res.status(201).json({ message: 'Company added successfully!', company: newCompany });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to add company. Please try again.' });
    }
};


// const Company = require('../models/company');

exports.getCompanies = async (req, res, next) => {
    try {
        const companies = await Company.findAll({
            where: { userId: req.user.id },
            include: {
                model: Job,
                attributes: ['company']
            }
        });

        res.status(200).json({ companies });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to fetch companies. Please try again.' });
    }
};


const { Op } = require('sequelize');
// const Company = require('../models/company');
// const Job = require('../models/jobs');

exports.getCompany = async (req, res) => {
    try {
        // Find the company details, including the company name from the Job table
        const company = await Company.findOne({
            where: { id: req.params.id, userId: req.user.id },
            include: [
                {
                    model: Job, // Include the Job table
                    attributes: ['company'], // Fetch only the 'company' field from the Job table
                }
            ]
        });

        if (!company) {
            return res.status(404).json({ message: 'Company not found' });
        }

        // Respond with the merged data (Company table details + Job's company name and company ID)
        res.status(200).json({ 
            company: {
                companyId: company.id, // Include the Company ID
                companyName: company.Job.company, // Company name from the Job table
                contactDetails: company.contactDetails,
                companySize: company.companySize,
                industry: company.industry,
                notes: company.notes
            } 
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to fetch company details. Please try again.' });
    }
};

// exports.updateCompany = async (req, res, next) => {
//     const { name, contactDetails, companySize, industry, notes } = req.body;

//     try {
//         const company = await Company.findOne({ where: { id: req.params.id, userId: req.user.id } });
//         if (!company) {
//             return res.status(404).json({ message: 'Company not found' });
//         }

//         company.name = name || company.name;
//         company.contactDetails = contactDetails || company.contactDetails;
//         company.companySize = companySize || company.companySize;
//         company.industry = industry || company.industry;
//         company.notes = notes || company.notes;

//         await company.save();
//         res.status(200).json({ message: 'Company updated successfully', company });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: 'Failed to update company. Please try again.' });
//     }
// };

exports.deleteCompany = async (req, res, next) => {
    try {
        console.log("REQ PARASMS>>>>>>>>>>>>>>>>>>>>>>>>>>>>",req.params.id);
        const result = await Company.destroy({ where: { id: req.params.id, userId: req.user.id } });
        if (result === 0) {
            return res.status(404).json({ message: 'Company not found' });
        }
        res.status(200).json({ message: 'Company deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to delete company. Please try again.' });
    }
};

// const Company = require('../models/company');

exports.updateCompany = async (req, res) => {
    const companyId = req.params.id;
    // console.log("COMANY IDD>>>",companyId);
    const userId = req.user.id; // Assuming the Authorization middleware attaches the user ID to the request
    const { companyName, contactDetails, companySize, industry, notes } = req.body;

    try {
        // Find the company by ID and ensure it belongs to the authenticated user
        const company = await Company.findOne({ where: { id: companyId, userId: userId } });

        if (!company) {
            return res.status(404).json({ message: 'Company not found or you do not have access to update this company.' });
        }

        // Update the company's details
        company.companyName = companyName || company.companyName;
        company.contactDetails = contactDetails || company.contactDetails;
        company.companySize = companySize || company.companySize;
        company.industry = industry || company.industry;
        company.notes = notes || company.notes;

        await company.save(); // Save the updates to the database

        res.status(200).json({ message: 'Company updated successfully!', company });
    } catch (err) {
        console.error('Error updating company:', err);
        res.status(500).json({ message: 'Failed to update company. Please try again.' });
    }
};

