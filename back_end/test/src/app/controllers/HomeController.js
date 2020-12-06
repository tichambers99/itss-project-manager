const User = require('../models/User');
const Project = require('../models/Project')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const user = new User();
const project = new Project();
const privateKey = "k2l"
var cookieParser = require('cookie-parser')

// trang home cua user
class HomeController {

    //  profile of user
    showProfileOfUser(req, res, next) {
        if (req.signedCookies.userId) {
            user.getProfileOfUser(req.signedCookies.userId, function(result) {
                if (result) {
                    return res.json({
                        Profile: result
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

    // Project 
    showInfomationProject(req, res, next) {
        if (req.signedCookies.userId) {
            project.getProject(req.signedCookies.userId, function(result) {
                if (result) {
                    return res.json({
                        Project: result,
                    })
                } else {
                    return res.json("Error")
                }
            })
        } else
            return res.send("Error")
    }
    showInfomationTaskofProject(req, res, next) {
        if (req.signedCookies.userId) {
            project.getTask(req.params.id, function(result) {
                if (result) {
                    return res.json({
                        Tasks: result
                    })
                } else {
                    return res.json({ message: error })
                }
            })
        } else {
            return res.send("Error")
        }
    }




}

module.exports = new HomeController