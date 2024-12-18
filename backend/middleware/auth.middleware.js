const UserModel = require("../models/user.models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// auth middleware to verify the user that is logged in
module.exports.authUser = async (req, res, next) => {
    const token = req.cookies?.token || (req.headers.authorization ? req.headers.authorization.split(" ")[1] : null);
    if(!token){
        return res.status(401).send({ error: "Unauthorized" });``
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