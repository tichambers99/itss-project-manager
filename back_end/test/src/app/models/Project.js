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
    getTask: function(projectID, callback) {
        sql.query("Select task.id,task.name,task.status,task.introduction,task.deadline,task.deleted,task.created_date, task.image from task inner join project on project.id = task.project_id where project.id = ?", [projectID], function(err, result) {
            if (err) throw err
            callback(result);
        })
    },
    // create Project and Task
    createProject: function(userID, body, callback) {
        var values = [body.leader_id, body.name, body.status, body.work_counts, body.deadline, body.introduction, body.deleted, body.created_date]
        
        sql.query("Insert into project (leader_id,name,status,work_counts,deadline,introduction,deleted,created_date) Values (?,?,?,?,?,?,?,?) ", values, function(err, result) {
            if (err) throw err
            const values2 = [body.created_date, 1, body.leader_id, result.insertId];
            sql.query("Insert into user_project (joined_date, leader, user_id, project_id) Values (?,?,?,?) ", values2, function(err, result) {
                if (err) throw err
                callback(result);
            })
        })
    },
    createTask: function(body, callback) {
        var values = [body.name, body.status, body.introduction, body.deadline, body.deleted, body.created_date, body.project_id]
        sql.query("Insert into task (name,status,introduction,deadline,deleted,created_date,project_id) values (?,?,?,?,?,?,?)", values, function(err, result) {
            if (err) throw err
            callback(result);
        })
    },
    updateTask: function(taskId, body, callback) {
        sql.query("Update task SET introduction = ?, image = ? WHERE id = ?", [body.introduction, body.image, taskId],  function(err, result){
            if (err) throw err
            callback(result);
        })
    }
}

module.exports = Project;
