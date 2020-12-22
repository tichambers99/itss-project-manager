'user strict';
const sql = require("./db.js");
const bcrypt = require('bcrypt')

function Search(){};

Search.prototype = {
    searchProject: function(body, userId, callback){
        sql.query("SELECT project.id,project.leader_id, project.name, project.status, project.deadline, project.introduction from project INNER JOIN user_project ON project.id = user_project.project_id  WHERE user_project.user_id = ? AND project.name LIKE ?", [ userId, '%' + body.q +'%'], function(err, result) {
            if (err) throw err

            callback(result);
        })
    },

    searchTask: function(body, callback){
        sql.query("Select name from task where name = ?", [q], function(err, result){
            if(err) throw err

            callback(result);
        })
    }
}

module.exports = Search;