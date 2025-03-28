// routes/company.js
const express = require('express');
const router = express.Router();
const companyController = require('../controllers/company');
const Authorization = require('../middleware/auth');

router.post('/add-company', Authorization, companyController.addCompany);
router.get('/companies', Authorization, companyController.getCompanies);
router.get('/company/:id', Authorization, companyController.getCompany);
router.put('/company/:id', Authorization, companyController.updateCompany);
router.post('/company/:id', Authorization, companyController.deleteCompany);

module.exports = router;
