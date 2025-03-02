const { authCaptain } = require("../middleware/auth.middleware");
const rideModel = require("../models/ride.model");
const mapservice = require("../services/maps.service");
const crypto = require('crypto');
const { sendMsgToSocketId } = require("../socket");


// calculate fare
async function calculateFare(pickup, destination) {

    if (!pickup || !destination) {
        throw new Error('Pickup and destination are required');
    }

    const distanceTime = await mapservice.getDistanceTime(pickup, destination);


    if (!distanceTime || typeof distanceTime.distance.value !== 'number' || typeof distanceTime.duration.value !== 'number') {
        throw new Error('Invalid distance or duration');
    }

    const baseFare = {
        auto: 60, // Update base fare based on real-world data
        car: 100,
        bike: 20,
      };
      
      const perkmRate = {
        auto: 4, // Update per kilometer rate based on real-world data
        car: 6,
        bike: 2,
      };
      
      const perminRate = {
        auto: 2, // Update per minute rate based on real-world data
        car: 5,
        bike: 1.5,
      };

    const fare = {
        auto:( baseFare.auto +( distanceTime.distance.value / 1000) * perkmRate.auto + (distanceTime.duration.value / 60) * perminRate.auto).toFixed(2),
        car: (baseFare.car + (distanceTime.distance.value/ 1000) * perkmRate.car + (distanceTime.duration.value / 60) * perminRate.car).toFixed(2),
        bike: (baseFare.bike + (distanceTime.distance.value / 1000) * perkmRate.bike + (distanceTime.duration.value / 60) * perminRate.bike).toFixed(2),
    };
   
    return fare;
    
}

module.exports.calculateFare = calculateFare;


// function to get OTP
function getOTP(num) {
    const otp = crypto.randomInt(Math.pow(10, num - 1), Math.pow(10, num)).toString().padStart(num, '0');
    return  otp ;
}


module.exports.createRide = async ({user, pickup, destination, vehicleType}) => {
    if (!user || !pickup || !destination || !vehicleType) {
        throw new Error('All fields are required');
    }
   
    const fare = await calculateFare(pickup, destination);
    
    const ride = await rideModel.create({
        user,
        pickup, 
        destination,
        otp: getOTP(4),
        fare:fare[vehicleType],
    });



    return ride;
 }


module.exports.confirmRide = async ({rideId,captain}) => {
    if (!rideId) {
        throw new Error('All fields are required');
    }
    await rideModel.findByIdAndUpdate({_id: rideId}, {captain:captain._id, status: 'accepted'});
    const ride = await rideModel.findOne({ _id: rideId }).populate('user').populate('captain').select('+otp');
    
    if (!ride) {
        throw new Error('Ride not found');
    }
    return ride;
}

module.exports.startRide = async ({rideId, otp}) => {
    if (!rideId || !otp) {
        throw new Error('All fields are required');
    }

    const ride = await rideModel.findOne({ _id: rideId}).populate('user').populate('captain').select('+otp');
    if (!ride) {
        throw new Error('Ride not found');
    }
    if (ride.otp !== otp) {
        throw new Error('Invalid OTP');
    }
    if (ride.status !== 'accepted') {
        throw new Error('Ride not accepted');
    }

    await rideModel.findByIdAndUpdate({ _id: rideId }, { status: 'ongoing' });

    sendMsgToSocketId(ride.user.socketId, {
        event: 'ride-started',
        data: ride
    });

    return ride;
}

module.exports.endRide = async ({rideId,captain}) => {
    if (!rideId) {
        throw new Error('All fields are required');
    }

    const ride = await rideModel.findOne({ _id: rideId, captain: captain._id}).populate('user').populate('captain').select('+otp');
    
    
    if (!ride) {
        throw new Error('Ride not found');
    }
    if (ride.status !== 'ongoing') {
        throw new Error('Ride not started');
    }

    await rideModel.findByIdAndUpdate({ _id: rideId }, { status: 'completed' });


    return ride;
}