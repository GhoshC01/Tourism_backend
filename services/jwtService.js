const jwt = require('jsonwebtoken');

// Generate JWT token
exports.createToken = (id, role) => {
    return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: '1d' });
};
