const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const user = new User();
class AuthController {
    index(req, res) {
        res.render('./auth')
    }


    login(req, res) {
        var username = req.body.email;
        var password = req.body.password;
        user.find(username, function(result) {
            if (result) {
                if (bcrypt.compare(password, result.password)) {
                    res.send("Loggin successed")
                    return
                }

            }
            res.send("Loggin  failed")
        });
    }

}
module.exports = new AuthController;