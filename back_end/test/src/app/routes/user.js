const express = require('express');
const router = express.Router();
var UserController = require('../controllers/UserController')

router.get('/:id', UserController.view)

module.exports = router;