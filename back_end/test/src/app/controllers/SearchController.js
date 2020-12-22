var express = require('express');
var Search = require('../models/search')
var search = new Search();

class SearchController{

    index(req, res){
        res.render('./search')
    }

    searchProject(req, res){
        if (req.signedCookies.userId){
            search.searchProject(req.body, req.signedCookies.userId, function(result){
                if(result){
                    res.json({
                        message: 'Found',
                        result: result
                    })
                } else{
                    res.json({
                        message: 'Cannot find this project'
                    })
                }
            })
        }
    }
}

module.exports = new SearchController;