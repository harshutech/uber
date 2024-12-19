const { validationResult } = require('express-validator');
const captainmodel = require('../models/captain.models');
const captainservice = require('../services/captain.service');
const { hash } = require('bcrypt');
const blacklistModel = require('../models/blacklistToken.model');



// logic to register the captain
module.exports.registerCaptain = async(req,res,next)=>{
    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({errors: error.array()});
    }
    
    const {fullname,email,password,vehicle} = req.body;

    const iscaptainalreadyexist = await captainmodel.findOne({email});
    if(iscaptainalreadyexist){
        return res.status(400).json({error:'captain already exist'});
    }

    const hashPassword = await captainmodel.hashPassword(password);

    // we are sending the data to the captain service so that we can create the captain in the database 
    const captain= await captainservice.createCaptain({
        firstname:fullname.firstname,
        lastname:fullname.lastname,
        email,
        password:hashPassword,
        color:vehicle.color,
        plate:vehicle.plate,
        capacity:vehicle.capacity,
        vehicleType:vehicle.vehicleType
    });

    const token = captain.generateAuthToken();
    res.status(201).json({token,captain});
}

// logic to login the captain
module.exports.loginCaptain = async(req,res,next)=>{
    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({errors: error.array()});
    }
    const {email,password} = req.body;

    const captain = await captainmodel.findOne({email}).select('+password');
    if(!captain){
        return res.status(400).json({error:'captain not found'});
    }

    const isValidPassword = await captain.comparePassword(password);      
    if(!isValidPassword){
        return res.status(400).json({error:'Invalid email or password'});       
    }

    const token = captain.generateAuthToken();
    res.cookie('token',token);
    res.status(200).json({token,captain});

}


module.exports.getCaptainProfile = async(req,res,next)=>{
    const captain = req.captain;
    res.status(200).json({captain});
}



module.exports.logoutCaptain = async(req,res,next)=>{
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    if(!token){
        return res.status(400).json({error:'token not found'});
    }

     await blacklistModel.create({token});

     res.clearCookie('token');

    res.status(200).json({message:'logout successful'});
}