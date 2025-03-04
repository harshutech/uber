const mapservice = require("../services/maps.service");
const { validationResult } = require('express-validator');


module.exports.getCoordinates = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { address } = req.query;

    try {
        const coordinates = await mapservice.getAddressCoordinates(address);
        res.status(200).json(coordinates);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports.getDistanceTime = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { origin, destination } = req.query;
        const distanceTime = await mapservice.getDistanceTime(origin, destination);
        res.status(200).json(distanceTime);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "internal server error" })

    }
}

module.exports.getAutoSuggestions = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { input } = req.query;
        const suggestions = await mapservice.getAutoSuggestions(input);
        res.status(200).json(suggestions);
        
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "internal server error" })
    }
}