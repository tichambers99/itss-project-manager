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
    getProfileOfUser: function(userId, callback) {
        sql.query("Select * from user where user.id = ?", [userId], function(err, result) {
            if (err) throw err
            callback(result)
        })
    }
}



module.exports = User;