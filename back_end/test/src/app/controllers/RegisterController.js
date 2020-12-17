const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const user = new User()
class RegisterController {
    index(req, res) {
        res.render('./auth')
    }

    register(req, res) {
        const { username, password } = req.body;
        
        if (username && password) {
            user.find(username, function(result) {
                if (result) {
                    res.json({
                        message: "Account  was existed"
                    })
                    return
                } else {
                    user.create(req.body, function(lastID) {
                        if (lastID) {
                            res.json({ message: "Account is created" })
                            return
                        } else {
                            res.json({ message: "Account is already used" })
                            return
                        }
                    })
                }
            })
        } else {
            res.json({ message: "Username or password syntax error" })
            return
        }

    }

}
module.exports = new RegisterController;