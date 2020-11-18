const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const authController = require('../controllers/AuthController');
const regisController = require('../controllers/RegisterController');

router.get('/', regisController.index)
router.post('/', regisController.register)


module.exports = router;