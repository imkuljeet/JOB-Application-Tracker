// controllers/company.js
const Company = require('../models/company');

exports.addCompany = async (req, res, next) => {
    const { name, contactDetails, companySize, industry, notes } = req.body;

    try {
        const newCompany = await Company.create({
            name,
            contactDetails,
            companySize,
            industry,
            notes,
            userId: req.user.id // Assuming userId is stored in req.user
        });

        res.status(201).json({ message: 'Company added successfully!', company: newCompany });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to add company. Please try again.' });
    }
};

exports.getCompanies = async (req, res, next) => {
    try {
        const companies = await Company.findAll({ where: { userId: req.user.id } });
        res.status(200).json({ companies });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to fetch companies. Please try again.' });
    }
};

exports.getCompany = async (req, res, next) => {
    try {
        const company = await Company.findOne({ where: { id: req.params.id, userId: req.user.id } });
        if (!company) {
            return res.status(404).json({ message: 'Company not found' });
        }
        res.status(200).json({ company });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to fetch company details. Please try again.' });
    }
};

exports.updateCompany = async (req, res, next) => {
    const { name, contactDetails, companySize, industry, notes } = req.body;

    try {
        const company = await Company.findOne({ where: { id: req.params.id, userId: req.user.id } });
        if (!company) {
            return res.status(404).json({ message: 'Company not found' });
        }

        company.name = name || company.name;
        company.contactDetails = contactDetails || company.contactDetails;
        company.companySize = companySize || company.companySize;
        company.industry = industry || company.industry;
        company.notes = notes || company.notes;

        await company.save();
        res.status(200).json({ message: 'Company updated successfully', company });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to update company. Please try again.' });
    }
};

exports.deleteCompany = async (req, res, next) => {
    try {
        console.log("REQ PARAM>>>>>>",req.params.id,req.user.id);
        // const result = await Company.destroy({ where: { id: req.params.id, userId: req.user.id } });
        // if (result === 0) {
        //     return res.status(404).json({ message: 'Company not found' });
        // }
        // res.status(200).json({ message: 'Company deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to delete company. Please try again.' });
    }
};
