const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');

// Define the user schema
const userSchema = new mongoose.Schema({
    fullname: {
        firstname: {
            type: String,
            required: true,
            minlength: [3, 'First name should be at least 3 characters long'],
        },
        lastname: {
            type: String,
            minlength: [3, 'Last name should be at least 3 characters long'],
        },
    },
    email: {
        type: String,
        required: true,
        unique: true, // To ensure email is unique
    },
    password: {
        type: String,
        required: true,
        select: false, // Password should not be included in query results by default
    },
    socketId: {
        type: String,
    },
});

// Instance method to generate JWT token
userSchema.methods.generateAuthToken = function () {
    const token = JWT.sign({ _id: this._id }, process.env.JWT_SECRET, {
        expiresIn: '24h', // Optional: Add expiration time for the token
    });
    return token;
};

// Instance method to compare passwords
userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

// Static method to hash the password
userSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10);
};

// Create the model from the schema
const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;
