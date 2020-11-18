const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const authController = require('../controllers/AuthController');



router.get('/', authController.index);
router.post('/', authController.login);
module.exports = router;