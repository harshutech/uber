const { Mongoose, default: mongoose } = require("mongoose");
const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');

const captainSchema = new mongoose.Schema({
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
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please add a valid email',
        ],
    },
    password: {
        type: String,
        required: true,
        select: false, // Password should not be included in query results by default
    },
    socketId: {
        type: String
    },
    status: {
        type: String,
        enum: ['active', 'incactive'],
        default: 'incactive'
    },
    vehicle: {
        color: {
            type: String,
            required: true,
            minlength: [3, 'color name should be at least 3 characters long'],
        },
        plate: {
            type: String,
            required: true,
            minlength: [3, 'plate name should be at least 3 characters long'],
        },
        capacity: {
            type: Number,
            required: true,
            min: [1, 'capacity must be atleast 1 person'],
        },
        vehicleType: {
            type: String,
            enum: ['car', 'bike', 'auto'],
            required: true,
        },
    },
    
    location: {
        type: { type: String, enum: ["Point"], required: true, default: "Point" },
        coordinates: { type: [Number], required: true }, // [longitude, latitude]
      },
})

captainSchema.methods.generateAuthToken = function(){
    const token = JWT.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
    return token;
}

captainSchema.methods.comparePassword = async function(password) {
    const isMatch = await bcrypt.compare(password, this.password);
    return isMatch;
}

captainSchema.statics.hashPassword = async function(password){
    const hashPassword = await bcrypt.hash(password, 10);
    return hashPassword;
}



const captailmodel = mongoose.model('captain', captainSchema);
module.exports = captailmodel