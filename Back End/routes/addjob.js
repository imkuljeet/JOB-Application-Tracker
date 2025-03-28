const express = require('express');
const router = express.Router();

const addjobController = require('../controllers/addjob');
const Authorization = require('../middleware/auth');

router.use('/add-job', Authorization, addjobController.addjob);

module.exports = router;
