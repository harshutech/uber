const { validationResult } = require('express-validator');
const user = require('../models/user.models');
const userservice = require('../services/user.service');
const usermodel = require('../models/user.models');


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



    const user = await userservice.createUser({
        firstname:fullname.firstname,
        lastname:fullname.lastname,
        email,
        password:hashPassword
    })

    const token = user.generateAuthToken();
    res.status(201).json({token,user})
}