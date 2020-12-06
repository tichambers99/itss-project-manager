const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const homeController = require('../controllers/HomeController');


router.get('/user', homeController.showProfileOfUser)
router.get('/project', homeController.showInfomationProject);
router.get('/project/:id', homeController.showInfomationTaskofProject)

module.exports = router;