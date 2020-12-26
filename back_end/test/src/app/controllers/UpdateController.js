const Project = require('../models/Project');
const project = new Project()
class UpdateController {
  // UPDATE: http://localhost:3000/update/task/:id
  updateTask(req, res) {
    if (req.body) {
      project.updateTask(req.params.id, req.body, function(result) {
          if (result) {
              return res.json({ message: "Task is updated" })
          } else {
              return res.json({ message: "Task is already created" })
          }
      })
    }
  }
}

module.exports = new UpdateController;