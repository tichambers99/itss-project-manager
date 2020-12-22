const { signedCookie } = require('cookie-parser');
const express = require('express');
var Comment = require('../models/comment');
var comment = new Comment();


class CommentController{
    showComment(req, res){
        var task_id = req.params.task_id
        // if(req.signedCookies.userId){
        //     comment.getComment(task_id, function(result){
        //         res.json({
        //             message: 'get success',
        //             result: result
        //         })
        //     })
        // } else{
        //     res.json({
        //         message: 'Login to see comment'
        //     })
        // }
        comment.getComment(task_id, function(result){
                    res.json({
                        message: 'get success',
                        result: result
                    })
                })
    }

    createComment(req, res){
        console.log(req.body);
        if(req.signedCookies.userId){
            comment.create(req.body, function(){
                res.json({message: 'comment success'})
            })
        } else{
            return res.json({ message: "You need login to create" })
        }
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
        if(req.signedCookies.userId){
            comment.deleteComment(req.body.commentId, function(){
                res.json({message: 'delete success'})
            })
        } else {
            res.json({
                message: 'cannot delete comment'
            })
        }
        // comment.deleteComment(req.body.commentId, function(result){
        //     console.log(req.body)
        //     if(result){
        //         res.json({message:"Successed"})
        //     }
        // })
    }
}

module.exports = new CommentController;