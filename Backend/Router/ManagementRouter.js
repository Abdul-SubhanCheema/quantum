
const express = require('express');
const ManagementController = require('../Controller/ManagementController');
const {jwtMiddleware}=require("../MiddleWare/JwtAccessToken")

const router = express.Router();
router.post('/register', ManagementController.registerUser);
router.post('/login',ManagementController.loginUser);
router.get('/refresh-token',ManagementController.refreshToken);
router.get('/users',jwtMiddleware,ManagementController.getAllUsers);
// router.post('/test',jwtMiddleware,ManagementController.Test);
router.put('/update-role/:id',jwtMiddleware,ManagementController.updateUserRole);

module.exports = router;