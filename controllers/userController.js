const User = require('../models/userModel');
const jwtService = require('../services/jwtService');
const bcrypt = require('bcryptjs');

// Register new user
exports.register = async (req, res) => {
    const { firstName, lastName, email, password, contact, role  } = req.body;
    try {
        const user = await User.create({ firstName, lastName, email, password, contact, role });
        const token = jwtService.createToken(user._id, user.role);
        res.status(201).json({ user, token });
    } catch (error) {
        res.status(400).json({ error: 'Error registering user' });
    }
};
// 7797704054
// Login user
exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }
        const token = jwtService.createToken(user._id, user.role);
        const LogInUser = user.name
        res.json(
            {
                token,
                msg: `${LogInUser} login successfully.`
            }
        )
    } catch (error) {
        res.status(500).json({ error: 'Login failed' });
    }
};



// Get a list of all users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        console.log(users);
        if (users) {
            res.status(200).json(users);
        } else {
            res.status(401).json("Tour not founds")
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error fetching users' });
    }
};


// Get a specific user by ID
exports.getUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching user' });
    }
};

// Update an existing user
exports.updateUser = async (req, res) => {
    const { id } = req.params;
    const { firstName, lastName, email, contact, role } = req.body;
    try {
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        await user.update({ firstName, lastName, email, contact, role });
        res.status(200).json({ message: 'User updated successfully', user });
    } catch (error) {
        res.status(400).json({ error: 'Error updating user' });
    }
};


// Delete a user
exports.deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        await user.destroy();
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting user' });
    }
};


// Logout user
exports.logout = (req, res) => {
    // Invalidate token logic
    res.status(200).json({ message: 'Logged out successfully' });
};
