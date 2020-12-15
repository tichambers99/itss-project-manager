const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const user = new User();
const privateKey = "k2l"
var cookieParser = require('cookie-parser')
class AuthController {
    index(req, res) {
        res.render('./auth')
    }

    login(req, res) {
        const { username, password } = req.body;
        user.find(username, function(result) {
            if (result) {
                if (password == result.pass) {
                    var token = jwt.sign(result.username, privateKey);
                    res.cookie("userId", result.id, {
                        signed: true
                    })

                    return res.status(200).send();
                }

            }
            res.status(500).send("Login failed");
        });

    }


}
module.exports = new AuthController;