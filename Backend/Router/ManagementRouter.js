
const express = require('express');
const ManagementController = require('../Controller/ManagementController');

const router = express.Router();
router.post('/register', ManagementController.registerUser);
router.post('/login',ManagementController.loginUser);

module.exports = router;