var express = require('express');
var SearchController = require('../controllers/SearchController');
const Search = require('../models/search');
var router = express.Router();

router.get('/', SearchController.index);
router.post('/', SearchController.searchProject);


module.exports = router;
