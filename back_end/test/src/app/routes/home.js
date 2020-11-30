const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const homeController = require('../controllers/HomeController');



router.get('/', homeController.showInfomationUser);


module.exports = router;