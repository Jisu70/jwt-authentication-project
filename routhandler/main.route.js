const express = require('express');

const router = express.Router();

const mainController = require('../controller/main.controller.js');

router.get('/', mainController.mainRoute);

router.post('/savedata', mainController.saveData);

module.exports = router;
