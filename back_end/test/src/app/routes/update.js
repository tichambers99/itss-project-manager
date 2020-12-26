const express = require('express');
const router = express.Router();
const updateController = require('../controllers/UpdateController');

router.post('/task/:id', updateController.updateTask)

module.exports = router;