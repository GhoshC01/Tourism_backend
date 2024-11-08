const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const tourRoutes = require('./routes/tourRoutes');
const blogRoutes = require('./routes/blogRoutes');
const cors = require('cors');



dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());


app.use('/uploads', express.static('uploads'));

app.use('/api/role', userRoutes);
app.use('/api/tour', tourRoutes);
app.use('/api/blog', blogRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
