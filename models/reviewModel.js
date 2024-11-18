const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    rating: { type: String, required: true },
   
    comments: { type: String },
  },
  { timestamps: true }
);

const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;
