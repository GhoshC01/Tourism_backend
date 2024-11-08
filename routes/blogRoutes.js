const express = require('express');
const blogController = require('../controllers/blogController');
const { protect, adminOnly } = require('../middleware/authMiddleware');
const upload =require('../middleware/multerMiddleware')
// const multer = require('multer');
const router = express.Router();


// const upload = multer({ storage }).array('images', 5);

// Routes protected by authentication and admin check
router.post('/',  blogController.addBlog);
// router.get('/', adminOnly, tourController.getAllTours);
router.get('/', blogController.getAllBlogs);
// router.put('/:id', adminOnly, upload, tourController.updateTour);
router.put('/:id', blogController.updateBlog);
// router.delete('/:id', adminOnly, tourController.deleteTour);
router.delete('/:id',blogController.deleteBlog);

module.exports = router;
