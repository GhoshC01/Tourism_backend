const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
    ContryName: { type: String, required: true },
    image: [{ type: String }],           // Array of image URLs
    description: { type: String, required: true }
}, { timestamps: true });

const Tour = mongoose.model('Tour', tourSchema);
module.exports = Tour;
