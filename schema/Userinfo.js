const mongoose = require('mongoose');

// Define a Mongoose Schema and Model for a sample entity (e.g., User)
const userSchema = new mongoose.Schema({
    fullname: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true },
    username: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true }
});

// Create the Mongoose model for User
const Userinfo = mongoose.model('Userinfo', userSchema);

module.exports = Userinfo;
