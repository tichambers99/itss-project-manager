const express = require('express');
const router = express.Router();
const createController = require('../controllers/CreateController');

router.get('/', createController.index)
router.post('/project', createController.createProject)
router.get('/task/:id', createController.indexCreateTask)
router.post('/task', createController.createTask)

module.exports = router;