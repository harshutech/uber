const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const captainController = require('../controllers/captain.controllers');
const authmiddleware = require('../middleware/auth.middleware');



// route to register the captain
router.post('/register',[
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullname.firstname').isLength({min:3}).withMessage('first name should be at least 3 character long'),
    body('password').isLength({min:6}).withMessage('password must be 6 character in length'),
    body('vehicle.color').isLength({min:3}).withMessage('color should be at least 3 character long'),
    body('vehicle.plate').isLength({min:3}).withMessage('model should be at least 3 character long'),
    body('vehicle.capacity').isInt({min:1}).withMessage('capacity should be at least 1 person'),
    body('vehicle.vehicleType').isIn(['car','bike','auto']).withMessage('type should be car, bike or auto')
],captainController.registerCaptain)


// route to login the captain
router.post('/login',[
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({min:6}).withMessage('password must be 6 character in length')
],captainController.loginCaptain)

// route to get the captain profile
router.get('/profile',authmiddleware.authCaptain,captainController.getCaptainProfile)
router.get('/logout',authmiddleware.authCaptain,captainController.logoutCaptain)





module.exports = router