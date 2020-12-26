const express = require('express');
const router = express.Router();
const authController = require('../controllers/AuthController');

router.get('/', authController.index);
router.post('/sign-in', authController.login);
router.get('/log-out', authController.logout);

module.exports = router;