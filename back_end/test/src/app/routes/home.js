const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const homeController = require('../controllers/HomeController');

// router.get('/user', homeController.showProfileOfUser)
router.get('/', homeController.showInfomationProject);
router.get('/task/:id', homeController.showInfomationTaskofProject)
router.get('/member/:id', homeController.getMemberOfProject)
router.get('/members', homeController.getAllMembers)
router.post('/member/add', homeController.addMember)
router.get('/member/remove/:id', homeController.removeMember)

module.exports = router;