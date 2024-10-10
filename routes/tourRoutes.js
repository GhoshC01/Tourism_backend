const express = require('express');
const tourController = require('../controllers/tourController');
const { protect, adminOnly } = require('../middleware/authMiddleware');
const upload =require('../middleware/multerMiddleware')
// const multer = require('multer');
const router = express.Router();


// const upload = multer({ storage }).array('images', 5);

// Routes protected by authentication and admin check
router.post('/',  tourController.addTour);
// router.get('/', adminOnly, tourController.getAllTours);
router.get('/', tourController.getAllTours);
// router.put('/:id', adminOnly, upload, tourController.updateTour);
router.put('/:id', tourController.updateTour);
// router.delete('/:id', adminOnly, tourController.deleteTour);
router.delete('/:id',tourController.deleteTour);

module.exports = router;
