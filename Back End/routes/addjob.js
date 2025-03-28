const express = require('express');
const router = express.Router();

const addjobController = require('../controllers/addjob');

router.post('/add-job',addjobController.addjob);
// router.post('/login',userController.login);

module.exports = router;
