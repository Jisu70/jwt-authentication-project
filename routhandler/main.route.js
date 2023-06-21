const express = require('express');

const router = express.Router();

const mainController = require('../controller/main.controller.js');
// Main home route
router.get('/', mainController.mainRoute);
// To save the userdata
router.post('/savedata', mainController.saveData);
// login 
router.post('/login', mainController.loginUser);

module.exports = router;
