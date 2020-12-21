const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const homeController = require('../controllers/HomeController');

// router.get('/user', homeController.showProfileOfUser)
router.get('/', homeController.showInfomationProject);
router.get('/:id', homeController.showInfomationTaskofProject)

module.exports = router;