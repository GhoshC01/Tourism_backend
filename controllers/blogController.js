const Blog = require('../models/blogModel');
const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

// Multer configuration for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './BlogUploads/');  // Ensure you have an 'uploads' directory
    },
    filename: (req, file, cb) => {
        const uniqueFilename = uuidv4() + path.extname(file.originalname); // Generate unique filenames
        cb(null, uniqueFilename);
    }
});

// Multer middleware for handling multiple image uploads (up to 10)
const upload = multer({ storage }).array('images', 10);

// Admin: Add a new Blog
exports.addBlog = (req, res) => {
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

            // Create the new Blog with the uploaded images and other data
            const newBlog = await Blog.create({
                image: images,  // Make sure this matches your schema
                content: req.body.content,
            });

            res.status(201).json(newBlog);  // Send the newly created Blog as response
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });
};



// Admin: Get all Blog
exports.getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find();
        if (blogs) {
            res.status(200).json(blogs);
        } else {
            res.status(401).json("Blog not founds")
        }

    } catch (error) {
        res.status(500).json({ error: 'Error fetching blog' });
    }
};

exports.updateBlog = (req, res) => {
    // Use multer middleware to handle file uploads
    upload(req, res, async (err) => {
        if (err) {
            return res.status(500).json({ error: err.message, message: "File upload failed" });
        }

        const {  content } = req.body;
        const newImages = req.files ? req.files.map(file => file.path) : [];

        try {
            // Find the blog by ID
            const blog = await Blog.findById(req.params.id);
            if (!blog) {
                return res.status(404).json({ error: 'Blog not found' });
            }

            // Update fields if provided
            if (content) blog.content = content;

            // Append new images to the existing ones (keep the old images)
            if (newImages.length > 0) {
                blog.image = [...blog.image, ...newImages];  // Merge old and new images
            }

            // Save the updated Blog document
            const updatedBlog = await blog.save();

            // Respond with the updated Blog document
            res.status(200).json({ message: "Blog updated successfully", blog: updatedBlog });
        } catch (error) {
            res.status(500).json({ error: 'Error updating blog', details: error.message });
        }
    });
};

// Admin: Delete a Blog by ID
exports.deleteBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) return res.status(404).json({ error: 'Blog not found' });

        await Blog.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Blog deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting blog' });
    }
};
