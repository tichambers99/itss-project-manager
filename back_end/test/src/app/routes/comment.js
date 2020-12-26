const express = require('express');
const router = express.Router();
const CommentController = require('../controllers/CommentController');

router.get('/create', CommentController.viewComment)
router.get('/delete/:id', CommentController.deleteComment)
router.get('/edit', CommentController.viewEditComment)
router.post('/deleted', CommentController.deleteComment)
router.post('/create', CommentController.createComment)
router.post('/edit', CommentController.editComment)
router.get('/:task_id', CommentController.showComment)

module.exports = router;