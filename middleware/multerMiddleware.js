// const multer = require('multer');
// const path = require('path');

// // Define storage for images
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, '../uploads/');  // Store files in the uploads folder
//   },
//   filename: (req, file, cb) => {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//     cb(null, uniqueSuffix + path.extname(file.originalname));  // Ensure unique filenames
//   }
// });

// // Initialize multer for multiple file uploads
// const upload = multer({
//   storage: storage,
//   fileFilter: (req, file, cb) => {
//     const filetypes = /jpeg|jpg|png/;
//     const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
//     const mimetype = filetypes.test(file.mimetype);

//     if (extname && mimetype) {
//       cb(null, true);
//     } else {
//       cb(new Error('Only image files are allowed!'));
//     }
//   }
// });

// module.exports = upload;
