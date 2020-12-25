const Project = require('../models/Project');
const project = new Project()
class DeleteController {
  // DELETE: http://localhost:3000/delete/task/:id
  deleteTask(req, res) {
    project.deleteTask(req.body.projectId, req.params.id, function(result) {
      if (result) {
        return res.json({ message: "Task is deleted" })
      }
    })
  }

  deleteProject(req, res) {
    project.deleteProject(req.params.id, function(result) {
      if (result) {
        return res.json({ message: "Project is deleted" })
      }
    })
  }
}

module.exports = new DeleteController;