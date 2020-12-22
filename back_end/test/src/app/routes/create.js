const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const createController = require('../controllers/CreateController');

router.get('/', createController.index)
router.post('/createProject', createController.createProject)
router.get('/:id/createTask', createController.indexCreateTask)
router.post('/:id/createTask', createController.createTask)
router.get('/:idproject/:idtask', createController.showTask)


module.exports = router;