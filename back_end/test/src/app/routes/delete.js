const express = require('express');
const router = express.Router();
const deleteController = require('../controllers/DeleteController');

router.post('/task/:id', deleteController.deleteTask)
router.get('/project/:id', deleteController.deleteProject)

module.exports = router;