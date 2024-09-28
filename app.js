const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const tourRoutes = require('./routes/tourRoutes');



dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.use('/uploads', express.static('uploads'));

app.use('/api/role', userRoutes);
app.use('/api/tour', tourRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
