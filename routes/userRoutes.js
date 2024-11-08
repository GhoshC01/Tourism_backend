const express = require('express');
const userController = require('../controllers/userController');
const { protect, adminOnly } = require('../middleware/authMiddleware');
const router = express.Router();

// Protected routes for user access
// router.get('/profile', protect, userController.getProfile);
router.post('/register', userController.register);
router.post('/login',  userController.login);
router.post('/logout', userController.logout);

// Admin-only route
// router.get('/admin', protect, adminOnly, userController.adminDashboard);
router.post('/admin/login', userController.login);
router.get('/admin/getAllUser', userController.getAllUsers);
router.get('/admin/getOneUser', userController.getUserById);
router.put('/admin/updateUser', userController.updateUser);
router.delete('/admin/deleteUser', userController.deleteUser);



module.exports = router;
