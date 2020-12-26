'user strict';
const sql = require("./db.js");

function Comment(){

}

Comment.prototype = {
    create: function(body, callback){
       var values =[body.title, body.content, body.date, body.user_id, body.task_id, body.deleted];
        sql.query('INSERT INTO comment(title, content, date, user_id, task_id, deleted) VALUES (?,?,?,?,?,?)', values, function(err, result){
            if(err) throw err;
            callback(result);
        })
    },

    getComment: function(taskId, callback){
        sql.query('SELECT * FROM comment WHERE task_id =? AND deleted = 0', [taskId], function(err, result){
            if(err) throw err;
            callback(result);
        })
    },

    deleteComment: function(commentId, callback){
        sql.query("UPDATE comment SET deleted = ? WHERE id = ?", [1, commentId], function(err, result){
            if (err) throw err;
            callback(result);
        })
    },

    edit: function(body, callback){
        //var values =[body.title, body.content, body.date, body.id];
         sql.query('UPDATE comment SET title = ?, content = ?, date = ? WHERE id = ?', [body.title, body.content, body.date, body.id], function(err, result){
             if(err) throw err;
             callback(result);
         })
     },
}

module.exports = Comment;