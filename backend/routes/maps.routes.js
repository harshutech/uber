const express = require("express");
const router = express.Router();
const authmiddleware = require("../middleware/auth.middleware");
const mapsController = require("../controllers/map.controller");
const {query} = require("express-validator");

router.get("/get-coordinates",
    query("address").isString().isLength({min:3}).withMessage("Address should be at least 3 character long"),
    authmiddleware.authUser,
    mapsController.getCoordinates);

router.get('/get-distance-time',
    query("origin").isString().isLength({min:3}).withMessage("Address should be at least 3 character long"),
    query("destination").isString().isLength({min:3}).withMessage("Address should be at least 3 character long"),
    authmiddleware.authUser,
    mapsController.getDistanceTime);

router.get('/get-suggestions',
    query('input').isString().isLength({min:3}).withMessage("Address should be at least 3 character long"),
    authmiddleware.authUser,
    mapsController.getAutoSuggestions
)

module.exports = router;
