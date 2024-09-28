const User = require('../models/userModel');
const jwtService = require('../services/jwtService');
const bcrypt = require('bcryptjs');

// Register new user
exports.register = async (req, res) => {
    const { name, email, password, role } = req.body;
    try {
        const user = await User.create({ name, email, password, role });
        const token = jwtService.createToken(user._id, user.role);
        res.status(201).json({ user, token });
    } catch (error) {
        res.status(400).json({ error: 'Error registering user' });
    }
};

// Login user
exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }
        const token = jwtService.createToken(user._id, user.role);
        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: 'Login failed' });
    }
};

// Logout user
exports.logout = (req, res) => {
    // Invalidate token logic
    res.status(200).json({ message: 'Logged out successfully' });
};
