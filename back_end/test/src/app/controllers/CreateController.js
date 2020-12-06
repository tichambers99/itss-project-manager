const Project = require('../models/Project');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
var cookieParser = require('cookie-parser')
const project = new Project()
class CreateController {
    // show view createProject
    index(req, res) {
            res.render('./createProject')
        }
        // show views createTask
    indexCreateTask(req, res) {
            res.render('./createTask')
        }
        // POST:http://localhost:3000/create
    createProject(req, res) {
            if (req.body) {
                if (req.signedCookies.userId) {
                    project.createProject(req.signedCookies.userId, req.body, function(result) {
                        if (result) {
                            return res.json({ message: "Project is created" })
                        } else {
                            return res.json({ message: "Project is already created" })
                        }
                    })
                } else {
                    return res.json({ message: "Syntax project error" })
                }
            }

        }
        //  POST:http://localhost:3000/create/idProject
    createTask(req, res) {
        if (req.body) {
            if (req.signedCookies.userId) {
                project.createTask(req.params.id, req.body, function(result) {
                    if (result) {
                        return res.json({ message: "Task is created" })
                    } else {
                        return res.json({ message: "Task is already created" })
                    }
                })
            } else {
                return res.json({ message: "Syntax Task error" })
            }
        }

    }

}
module.exports = new CreateController;