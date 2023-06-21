const express = require('express');

const router = express.Router();

const mainController = require('../controller/main.controller.js');

const checkLogin = require('../middleware/checkLogin.js')
// Main home route
router.get('/', checkLogin, mainController.mainRoute);
// To save the userdata
router.post('/savedata', mainController.saveData);
// login 
router.post('/login', mainController.loginUser);

module.exports = router;
