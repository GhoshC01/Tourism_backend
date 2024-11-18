const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },  
    password: { type: String, required: true },
    contact: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' }
});

// Hashing password before saving the user 
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

const User = mongoose.model('User', userSchema);
module.exports = User 
