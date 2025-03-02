const rideservice = require("../services/ride.service");
const { validationResult } = require("express-validator");
const mapservice = require("../services/maps.service");
const {sendMsgToSocketId} = require('../socket');
const rideModel = require("../models/ride.model");

module.exports.createRide = async (req, res, next) => {

    const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
      
    const { userId, pickup, destination, vehicleType } = req.body;

    try {
        const ride = await rideservice.createRide({user:req.user._id, pickup, destination, vehicleType });
        res.status(201).json(ride);
        const pickupCoordinates = await mapservice.getAddressCoordinates(pickup);
        const captainsInRadius = await mapservice.getCaptainInTheRadius(pickupCoordinates.ltd, pickupCoordinates.lng, 10);
        ride.otp = " "
        console.log("captain avilable ",captainsInRadius);
        const ridewithUser = await rideModel.findOne({_id: ride._id}).populate('user');
        captainsInRadius.map(async captain => {
        sendMsgToSocketId(captain.socketId,{
            event: 'new-ride',
            data: ridewithUser
        });
        }
        )
    } catch (err) { 
        console.log(err);
        res.status(500).json({ message: "internal server error" });
    }
   
}; 


module.exports.getfare = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Extract from query instead of body
    const { pickup, destination } = req.query;

    try {
        const fare = await rideservice.calculateFare(pickup, destination);
        res.status(200).json(fare);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal server error" });
    }
};


module.exports.confirmRide = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { rideId } = req.body;

    try {
        const ride = await rideservice.confirmRide({rideId,captain:req.captain});
        sendMsgToSocketId(ride.user.socketId, {
            event: 'ride-confirmed',
            data: ride
        });
         
        res.status(200).json(ride);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal server error" });
    }
}

module.exports.startRide = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {rideId,otp} = req.query;

    try {
        const ride = await rideservice.startRide({rideId,otp,captain:req.captain});
        sendMsgToSocketId(ride.user.socketId, {
            event: 'ride-started',
            data: ride
        });
        res.status(200).json(ride);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal server error" }); 

    }
}

module.exports.endRide = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {rideId} = req.query;

    try {
        const ride = await rideservice.endRide({rideId,captain:req.captain});
        sendMsgToSocketId(ride.user.socketId, {
            event: 'ride-ended',
            data: ride
        });
        res.status(200).json(ride);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal server error" });
    }
}