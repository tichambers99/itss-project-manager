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

    // Project 
    showInfomationProject(req, res) {
        project.getProject(req.signedCookies.userId, function(result) {
            if (result) {
                return res.json({
                    Project: result,
                })

            } else {
                return res.json("Error")
            }
        })
    }

    showInfomationTaskofProject(req, res) {
        project.getTask(req.params.id, function(result) {
            if (result) {
                return res.json({
                    Tasks: result
                })
            } else {
                return res.json({ message: error })
            }
        })
    }

    getMemberOfProject(req, res) {
        project.getMember(req.params.id, function(result) {
            if (result) {
                return res.json({
                    members: result
                })
            } else {
                return res.json({ message: "error get member" })
            }
        })
    }

    getAllMembers(req, res) {
        project.getAllMembers(function(result) {
            if (result) {
                return res.json({
                    allMembers: result
                })
            } 
            else {
                return res.json({ message: "error get all members" })
            }
        })
    }

    addMember(req, res) {
        project.addMember(req.body, function(result) {
            if (result) {
                return res.status(200).json({
                    message: 'add member succesfully'
                })
            } 
            else {
                return res.json({ message: "error get all members" })
            }
        })
    }

    removeMember(req, res) {
        project.removeMember(req.params.id, function(result) {
            if (result) {
                return res.status(200).json({
                    message: 'remove member succesfully'
                })
            } 
            else {
                return res.json({ message: "error remove member" })
            }
        })
    }
}

module.exports = new HomeController