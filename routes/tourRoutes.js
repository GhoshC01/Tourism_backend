const express = require('express');
const tourController = require('../controllers/tourController');
const { protect, adminOnly } = require('../middleware/authMiddleware');
const multer = require('multer');
const router = express.Router();

// Multer configuration for image uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage });

// Routes protected by authentication and admin check
router.post('/', protect, adminOnly, upload.array('images', 5), tourController.addTour);
router.get('/', protect, adminOnly, tourController.getAllTours);
router.put('/:id', protect, adminOnly, upload.array('images', 5), tourController.updateTour);
router.delete('/:id', protect, adminOnly, tourController.deleteTour);

module.exports = router;
