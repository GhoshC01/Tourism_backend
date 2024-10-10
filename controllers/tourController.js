const Tour = require('../models/tourModel');
const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

// Multer configuration for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/');  // Ensure you have an 'uploads' directory
    },
    filename: (req, file, cb) => {
        const uniqueFilename = uuidv4() + path.extname(file.originalname); // Generate unique filenames
        cb(null, uniqueFilename);
    }
});

// Multer middleware for handling multiple image uploads (up to 10)
const upload = multer({ storage }).array('images', 10);

// Admin: Add a new tour
exports.addTour = (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.status(500).json({ error: err.message, errors: "File not uploaded" });
        }

        try {
            // Check if any files were uploaded
            if (!req.files || req.files.length === 0) {
                return res.status(400).json({ error: "No files uploaded" });
            }

            // Map the uploaded files to get their paths
            const images = req.files.map(file => file.path); // Store image paths (relative)

            // Create the new tour with the uploaded images and other data
            const newTour = await Tour.create({
                ContryName: req.body.ContryName,
                image: images,  // Make sure this matches your schema
                description: req.body.description,
            });

            res.status(201).json(newTour);  // Send the newly created tour as response
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });
};



// Admin: Get all tours
exports.getAllTours = async (req, res) => {
    try {
        const tours = await Tour.find();
        if (tours) {
            res.status(200).json(tours);
        } else {
            res.status(401).json("Tour not founds")
        }

    } catch (error) {
        res.status(500).json({ error: 'Error fetching tours' });
    }
};
exports.updateTour = (req, res) => {
    // Use multer middleware to handle file uploads
    upload(req, res, async (err) => {
        if (err) {
            return res.status(500).json({ error: err.message, message: "File upload failed" });
        }

        const { ContryName, description } = req.body;
        const newImages = req.files ? req.files.map(file => file.path) : [];

        try {
            // Find the tour by ID
            const tour = await Tour.findById(req.params.id);
            if (!tour) {
                return res.status(404).json({ error: 'Tour not found' });
            }

            // Update fields if provided
            if (ContryName) tour.ContryName = ContryName;
            if (description) tour.description = description;

            // Append new images to the existing ones (keep the old images)
            if (newImages.length > 0) {
                tour.image = [...tour.image, ...newImages];  // Merge old and new images
            }

            // Save the updated tour document
            const updatedTour = await tour.save();

            // Respond with the updated tour document
            res.status(200).json({ message: "Tour updated successfully", tour: updatedTour });
        } catch (error) {
            res.status(500).json({ error: 'Error updating tour', details: error.message });
        }
    });
};

// Admin: Delete a tour by ID
exports.deleteTour = async (req, res) => {
    try {
        const tour = await Tour.findById(req.params.id);
        if (!tour) return res.status(404).json({ error: 'Tour not found' });

        await Tour.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Tour deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting tour' });
    }
};
