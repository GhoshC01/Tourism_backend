const Reviews =require('../models/reviewModel')

// Get a list of all users
exports.getAllReview = async (req, res) => {
    try {
        const review = await Reviews.find();
        console.log(review);
        if (review) {
            res.status(200).json(review);
        } else {
            res.status(401).json("Review not founds")
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error fetching review' });
    }
};


// Get a specific review by ID
exports.getReviewById = async (req, res) => {
    const { id } = req.params;
    try {
        const review = await Reviews.findByPk(id);
        if (!review) {
            return res.status(404).json({ error: 'Review not found' });
        }
        res.status(200).json(review);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching review' });
    }
};

// Update an existing review
exports.updateReview = async (req, res) => {
    const { id } = req.params;
    const { firstName, lastName, email, contact, role } = req.body;
    try {
        const review = await Reviews.findByPk(id);
        if (!review) {
            return res.status(404).json({ error: 'Review not found' });
        }
        await review.update({ firstName, lastName, email, contact, role });
        res.status(200).json({ message: 'Review updated successfully', review });
    } catch (error) {
        res.status(400).json({ error: 'Error updating review' });
    }
};


// Delete a review
exports.deleteReview = async (req, res) => {
    const { id } = req.params;
    try {
        const review = await Reviews.findByPk(id);
        if (!review) {
            return res.status(404).json({ error: 'Review not found' });
        }
        await review.destroy();
        res.status(200).json({ message: 'Review deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting review' });
    }
};

