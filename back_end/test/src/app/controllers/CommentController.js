const { signedCookie } = require('cookie-parser');
const express = require('express');
var Comment = require('../models/comment');
var comment = new Comment();


class CommentController{
    showComment(req, res){
        var task_id = req.params.task_id
        comment.getComment(task_id, function(result){
            res.json({
                message: 'get success',
                result: result
            })
        })
    }

    createComment(req, res){
        comment.create(req.body, function(){
            res.json({message: 'comment success'})
        })
    }

    viewEditComment(req, res){
        res.render('./editComment')
    }

    editComment(req, res){
        if(req.signedCookies.userId){
            comment.edit(req.body, function(){
                res.json({message: 'edit comment success'})
            })
        } else{
            return res.json({ message: "You need login to edit" })
        }
    }

    viewComment(req, res){
        res.render('./createComment')
    }

    viewDeleteComment(req, res){
        res.render('./deletedComment')
    }

    deleteComment(req, res){
        comment.deleteComment(req.params.id, function(){
            res.json({message: 'delete success'})
        })
    }
}

module.exports = new CommentController;