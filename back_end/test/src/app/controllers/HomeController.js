const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const user = new User();
const privateKey = "k2l"
var cookieParser = require('cookie-parser')

// trang home cua user
class HomeController {

    showInfomationUser(req, res, next) {
        if (req.signedCookies.userId) {

            user.getProject(req.signedCookies.userId, function(result) {
                if (result) {
                    return res.json({
                        result: result
                    })
                } else {
                    return res.json({
                        message: error
                    })
                }
            })

        } else {
            return res.send("Error")
        }

    }
}

module.exports = new HomeController