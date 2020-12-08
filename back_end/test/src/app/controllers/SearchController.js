var express = require('express');
var Search = require('../models/search')
var search = new Search();

class SearchController{

    index(req, res){
        res.render('./search')
    }

    searchTask(req, res){
        if (req.signedCookies.userId){
            console.log("OK");

        }
    }
}

module.exports = new SearchController;