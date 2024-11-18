const mongoose = require("mongoose");

const tourSchema = new mongoose.Schema(
  {
    ContryName: { type: String, required: true },
    image: {
      type: [String], // Array to store multiple image paths
      required: true,
    },
    description: { type: String },
  },
  { timestamps: true }
);

const Tour = mongoose.model("Tour", tourSchema);
module.exports = Tour;
