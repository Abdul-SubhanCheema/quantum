
const express = require('express');
const ManagementController = require('../Controller/ManagementController');
const {jwtMiddleware}=require("../MiddleWare/JwtAccessToken")

const router = express.Router();
router.post('/register', ManagementController.registerUser);
router.post('/login',ManagementController.loginUser);
router.post('/test',jwtMiddleware,ManagementController.Test);

module.exports = router;