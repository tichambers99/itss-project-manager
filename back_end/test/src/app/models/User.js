'user strict';
const sql = require("./db.js");
const bcrypt = require('bcrypt')
    //Task object constructor
function User() {};

    find: function(user = null, callback) {
        sql.query("SELECT * FROM user  WHERE username = ?", [user], function(err, result) {
            if (err) throw err

            callback(result[0]);


        });
    },
    
    create: function(body, callback) {
        let pwd = body.password
        body.password = bcrypt.hashSync(pwd, 10);
        sql.query("INSERT INTO user(username, password) VALUES (?,?)", [body.email, body.password], function(err, result) {
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
        sql.query("Select user.username, profiles.date, profiles.email, profiles.address, profiles.github from profiles INNER JOIN user ON profiles.user_id = user.id WHERE profiles.user_id = ?", [userId], function(err, result) {
            if (err) throw err

            callback(result[0]);

        })
    },

    updateInfor: function(reqBody, userId, callback){
        //var values =[reqBody.mail, reqBody.date, reqBody.address, reqBody.github]
        sql.query("UPDATE profiles SET date = ?, email = ?, address = ?, github = ? WHERE user_id = ?", [reqBody.date, reqBody.mail, reqBody.address, reqBody.github, userId],  function(err, result){
            if (err) throw err
        })

        sql.query("UPDATE user SET username = ? WHERE id = ?", [reqBody.username, userId], function(err, result){
            if (err) throw err;
        })
        callback();
    },

    changePassword: function(reqBody, userId, callback){
        sql.query("UPDATE user SET pass =? WHERE id = ?", [reqBody.password, userId], function(err, result){
            if(err) throw err;
            console.log(result);
            callback(result);
        })
    }

    
}



module.exports = User;