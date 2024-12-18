const { validationResult } = require('express-validator');
const user = require('../models/user.models');
const userservice = require('../services/user.service');
const usermodel = require('../models/user.models');
const BlacklistToken = require('../models/blacklistToken.model');


// logic to register the user
module.exports.registerUser = async(req,res,next)=>{
    // sending all the incomming data to the excpress validator to validation result
    const errors = validationResult(req);
    // if validation results is not empty so show the error with response status
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    
    // destructuring the data which is recived form the request
    const {fullname,email,password}= req.body;
    // usign a method to hash the passwors which is defined in usermnodel
    const hashPassword = await usermodel.hashPassword(password);


    // sending the data to the user service
    const user = await userservice.createUser({
        firstname:fullname.firstname,
        lastname:fullname.lastname,
        email,
        password:hashPassword
    })
    //generating the token 
    const token = user.generateAuthToken();
    res.status(201).json({token,user})
}



// logic to login the user
module.exports.loginUser = async(req,res,next)=>{
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    const {email,password} = req.body;
    const user = await usermodel.findOne({email}).select('+password');
    if(!user){
        return res.status(401).json({error:'Invalid email or password'});
    }

    const isMatch = await user.comparePassword(password);
    if(!isMatch){
        return res.status(401).json({error:'Invalid email or password'});
    }
    
    const token = user.generateAuthToken();
    res.cookie('token', token);
    res.status(200).json({token,user});
}

// logic to get the user profile
module.exports.getUserProfile = async(req,res,next)=>{
    const user = req.user;
    res.status(200).json({user});
}


// logout the user
module.exports.logoutUser = async(req,res,next)=>{
    res.clearCookie('token');
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    await BlacklistToken.create({token});

    res.status(200).json({message : "Logout successfully"});
}
