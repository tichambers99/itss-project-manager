'user strict';
const sql = require("./db.js");
const bcrypt = require('bcrypt')
    //Task object constructor
function User() {};

User.prototype = {
    find: function(user = null, callback) {
        sql.query("Select * from user  where username = ?", [user], function(err, result) {
            if (err) throw err

            callback(result[0]);


        });
    },
    
    create: function(body, callback) {
        let pwd = body.password
        body.password = bcrypt.hashSync(pwd, 10);
        sql.query("Insert into user(username, password) values (?,?)", [body.email, body.password], function(err, result) {
            if (err) throw err
            callback(result)
        });
    },


    getProject: function(userId, callback) {
        sql.query("Select project.leader_id,project.name,project.status,project.deadline,project.introduction from project inner join (user_project inner join user on user_project.user_id = user.id where user.id = ?)on project.id = user_project.project_id", [userId], function(err, result) {
            if (err) throw err
            callback(result);
        });
    },

    findUserbyId: function(userId, callback){
        sql.query("Select * from profiles where user_id = ?", [userId], function(err, result) {
            if (err) throw err

            callback(result[0]);

        })
    }
}



module.exports = User;