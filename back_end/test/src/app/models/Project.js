'user strict';
const sql = require("./db.js");
const bcrypt = require('bcrypt')
    //Task object constructor
function Project() {};

Project.prototype = {

    // get Project and Task of Project
    getProject: function(userId, callback) {
        sql.query("select project.id,project.leader_id, project.name, project.status, project.deadline, project.introduction from project inner join user_project on project.id = user_project.project_id inner join user on user_project.user_id = user.id where user.id = ?", [userId], function(err, result) {
            if (err) throw err
            callback(result);
        });
    },
    // show all task
    getTask: function(projectID, callback) {
        sql.query("Select task.id,task.name,task.status,task.introduction,task.deadline,task.deleted,task.created_date from task inner join project on project.id = task.project_id where project.id = ?", [projectID], function(err, result) {
            if (err) throw err
            callback(result);
        })
    },
    // create Project and Task
    createProject: function(userID, body, callback) {
        var values = [body.leader_id, body.name, body.status, body.work_counts, body.deadline, body.introduction, body.deleted, body.created_date]
        sql.query("Insert into project (leader_id,name,status,work_counts,deadline,introduction,deleted,created_date) Values (?,?,?,?,?,?,?,?) ", values, function(err, result) {
            if (err) throw err
            callback(result);
        })
    },
    createTask: function(projectID, body, callback) {
        var values = [body.name, body.status, body.introduction, body.deadline, body.deleted, body.created_date, projectID]
        sql.query("Insert into task (name,status,introduction,deadline,deleted,created_date,project_id) values (?,?,?,?,?,?,?)", values, function(err, result) {
            if (err) throw err
            callback(result);
        })
    },
    // show task by idtask
    showTask: function(projectID,taskID,callback){
        sql.query("SELECT task.id, task.name, task.status, task.introduction, task.deadline, task.deleted, task.created_date FROM task INNER JOIN project on project.id = task.project_id WHERE project.id =? AND task.id= ?",[projectID,taskID],function(err,result){
            if(err) throw err;
            callback(result);
        } )
    }
}



module.exports = Project;