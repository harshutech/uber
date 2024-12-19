const UserModel = require("../models/user.models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const blacklistModel = require("../models/blacklistToken.model");
const captainModel = require("../models/captain.models");

// auth middleware to verify the user that is logged in
module.exports.authUser = async (req, res, next) => {
    const token = req.cookies?.token || (req.headers.authorization ? req.headers.authorization.split(" ")[1] : null);
    if(!token){
        return res.status(401).send({ error: "Unauthorized" });``
    }
    // if token is blacklisted then return the error message 
    const isblacklisted = await blacklistModel.findOne({token});
    if(isblacklisted){
        return res.status(401).send({ error: "Unauthorized user" });
    }
  

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await UserModel.findOne({ _id: decoded._id });
        if (!user) {
            throw new Error();
        }
        req.user = user;
        req.token = token;
        return next();
    } catch (error) {
        return res.status(401).send({ error: "Please authenticate" });
    }
};


module.exports.authCaptain = async (req, res, next) => {
    const token = req.cookies?.token || (req.headers.authorization ? req.headers.authorization.split(" ")[1] : null);
    // console.log(token);
    
    if(!token){
        return res.status(401).send({ error: "Unauthorized in token" });``
    }

    isblacklisted = await blacklistModel.findOne({token});
    if(isblacklisted){
        return res.status(401).send({ error: "Unauthorized by token blacklist" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const captain = await captainModel.findOne({ _id: decoded._id });
        if (!captain) {
            throw new Error();
        }
        req.captain = captain;
        // req.token = token;
        return next();
    } catch (error) {
        return res.status(401).send({ error: "Unauthorized overall" });
    }
};