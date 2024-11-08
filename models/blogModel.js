const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    image: [{ type: String }],           // Array of image URLs
    content: { type: String,  }
}, { timestamps: true });

const Blog = mongoose.model('Blog', blogSchema);
module.exports = Blog;