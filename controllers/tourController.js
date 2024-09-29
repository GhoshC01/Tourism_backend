const Tour = require('../models/tourModel');
const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

// Multer configuration for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, uuidv4() + path.extname(file.originalname)); // Unique file names
    }
});
const upload = multer({ storage }).array('images', 10); // Up to 10 images
console.log(upload)

// Admin: Add a new tour
exports.addTour = (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.status(500).json({ error: err.message ,errors:"file not upload" });
        }

        try {
            const images = req.files.map(file => file.path);
            console.log(images)
            const Tours = await Tour.create({
                ContryName: req.body.ContryName,
                images,
                description: req.body.description,
            });
            res.status(201).json(Tours);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });
};


// Admin: Get all tours
exports.getAllTours = async (req, res) => {
    try {
        const tours = await Tour.find();
        res.status(200).json(tours);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching tours' });
    }
};

// Admin: Update a tour by ID
exports.updateTour = async (req, res) => {
    const { ContryName, description } = req.body;
    const images = req.files ? req.files.map(file => file.path) : undefined;

    try {
        const tour = await Tour.findById(req.params.id);
        if (!tour) return res.status(404).json({ error: 'Tour not found' });

        // Update fields
        tour.ContryName = ContryName || tour.ContryName;
        tour.description = description || tour.description;
        if (images) tour.image = images;  // Only update images if provided

        await tour.save();
        res.status(200).json(tour);
    } catch (error) {
        res.status(500).json({ error: 'Error updating tour' });
    }
};

// Admin: Delete a tour by ID
exports.deleteTour = async (req, res) => {
    try {
        const tour = await Tour.findById(req.params.id);
        if (!tour) return res.status(404).json({ error: 'Tour not found' });

        await tour.remove();
        res.status(200).json({ message: 'Tour deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting tour' });
    }
};
