'user strict';
const sql = require("./db.js");
const bcrypt = require('bcrypt')
    //Task object constructor
function User() {};

User.prototype = {
    find: function(user, callback) {
        sql.query("Select * from user where username = ?", [user], function(err, result) {
            if (err) throw err

            callback(result[0]);


        });
    },
    
    create: function(body, callback) {
        let pwd = body.password
        body.password = bcrypt.hashSync(pwd, 10);
        sql.query("Insert into user(username, pass, deleted) values (?,?,?)", [body.username, body.password, 0], function(err, result) {
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
    },

    updateInfor: function(reqBody, userId,callback){
        //var values =[reqBody.mail, reqBody.date, reqBody.address, reqBody.github]
        sql.query("Update profiles SET date = ?, email = ?, address = ?, github = ? WHERE user_id = ?", [reqBody.date, reqBody.mail, reqBody.address, reqBody.github, userId],  function(err, result){
            if (err) throw err

            callback(result);
        })
    }
}



module.exports = User;