'user strict';
const sql = require("./db.js");
const bcrypt = require('bcrypt')

function Search(){};

Search.prototype = {
    searchProject: function(body, callback){
        sql.query("Select name from project where name = ?", [user], function(err, result) {
            if (err) throw err

            callback(result[0]);

        });
    },

    searchTask: function(body, callback){
        sql.query("Select name from task where name = ?", [q], function(err, result){
            if(err) throw err

            callback(result);
        })
    }
}

module.exports = Search;