const express = require("express");
const router = express.Router();
const {body, query} = require('express-validator')
const rideController = require("../controllers/ride.controllers");
const authmiddleware = require("../middleware/auth.middleware");



router.post("/create-ride",
authmiddleware.authUser,
body('pickup').isString().isLength({min:3}).withMessage("pickup should be at least 3 character long"),
body('destination').isString().isLength({min:3}).withMessage("destination should be at least 3 character long"),
body('vehicleType').isIn(['car','bike','auto']).withMessage('type should be car, bike or auto'),

rideController.createRide
);


router.get("/get-fare",
    authmiddleware.authUser,
    query("pickup").isString(),    // Use `query` instead of `body`
    query("destination").isString(),
    rideController.getfare
);

router.post("/confirm-ride",
    authmiddleware.authCaptain,
    body('rideId').isMongoId().withMessage('Invalid ride id'),
    rideController.confirmRide
);

router.get('/start-ride',
    authmiddleware.authCaptain,
    query('rideId').isMongoId().withMessage('Invalid ride id'),
    query('otp').isNumeric().isLength({min:4,max:4}).withMessage('Invalid OTP'),
    rideController.startRide
)

router.get('/end-ride',
    authmiddleware.authCaptain,
    query('rideId').isMongoId().withMessage('Invalid ride id u gave'),
    rideController.endRide
)


module.exports = router;
