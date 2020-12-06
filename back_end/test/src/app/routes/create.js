const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const createController = require('../controllers/CreateController');

router.get('/', createController.index)
router.post('/', createController.createProject)
router.get('/:id', createController.indexCreateTask)
router.post('/:id', createController.createTask)


module.exports = router;