const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    image: [{ type: String }], // Array of image URLs
    content: { type: String, required: true },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Blog = mongoose.model("Blog", blogSchema);
module.exports = Blog;
