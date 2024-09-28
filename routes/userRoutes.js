const express = require('express');
const userController = require('../controllers/userController');
const { protect, adminOnly } = require('../middleware/authMiddleware');
const router = express.Router();

// Protected routes for user access
// router.get('/profile', protect, userController.getProfile);
router.post('/register', userController.register);
router.post('/login', protect, userController.login);
router.post('/logout', userController.logout);

// Admin-only route
// router.get('/admin', protect, adminOnly, userController.adminDashboard);
router.post('admin/login',protect, adminOnly, userController.login);



module.exports = router;
