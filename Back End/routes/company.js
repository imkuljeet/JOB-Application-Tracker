// routes/company.js
const express = require('express');
const router = express.Router();
const companyController = require('../controllers/company');
const Authorization = require('../middleware/auth');

const Company = require('../models/company');

router.post('/add-company', Authorization, companyController.addCompany);
router.get('/companies', Authorization, companyController.getCompanies);
router.get('/:id', Authorization, companyController.getCompany);
router.put('/company/:id', Authorization, companyController.updateCompany);
router.delete('/delete-company:id', Authorization,companyController.deleteCompany );

module.exports = router;
