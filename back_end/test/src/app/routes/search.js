var express = require('express');
var SearchController = require('../controllers/SearchController');
var router = express.Router();

router.get('/', SearchController.index);



module.exports = router;
