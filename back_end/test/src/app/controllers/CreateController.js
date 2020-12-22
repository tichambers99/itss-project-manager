const Project = require('../models/Project');
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
            project.createProject(req.signedCookies.userId, req.body, function(result) {
                if (result) {
                    return res.json({ message: "Project is created" })
                } else {
                    return res.status(500).json({ message: "Project is already created" })
                }
            })
        }

    }
        //  POST:http://localhost:3000/create/idProject
    createTask(req, res) {
        if (req.body) {
            project.createTask(req.body, function(result) {
                if (result) {
                    return res.json({ message: "Task is created" })
                } else {
                    return res.json({ message: "Task is already created" })
                }
            })
        }

    }
}
module.exports = new CreateController;