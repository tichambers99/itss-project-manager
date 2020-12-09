const express = require('express');
const router = express.Router();
var UserController = require('../controllers/UserController');
const User = require('../models/User');

router.post('/edit', UserController.editInfor)
router.get('/edit', UserController.viewEditInfor)
router.get('/:id', UserController.view)



module.exports = router;