const Tour = require('../models/tourModel');

// Admin: Add a new tour
exports.addTour = async (req, res) => {
    const { ContryName, description } = req.body;
    const images = req.files.map(file => file.path);  // Get file paths of uploaded images

    try {
        const newTour = await Tour.create({
            ContryName,
            image: images,  // Store multiple image paths
            description
        });
        res.status(201).json(newTour);
    } catch (error) {
        res.status(400).json({ error: 'Error creating tour' });
    }
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
