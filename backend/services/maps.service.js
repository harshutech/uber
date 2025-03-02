const axios = require('axios');
const captainmodel = require('../models/captain.models');

module.exports.getAddressCoordinates = async (address) => {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  const url = `https://maps.gomaps.pro/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;

  try {
    const response = await axios.get(url);
    if (response.data.status === "OK") {
      const coordinates = response.data.results[0].geometry.location;
      return {
        ltd: coordinates.lat,
        lng: coordinates.lng,
      };
    } else {
      console.error('API responded with an error:', response.data);
      throw new Error("Error getting address coordinates");
    }
  } catch (error) {
    console.error('Error fetching coordinates:', error.message);
    throw error;
  }
};


module.exports.getDistanceTime = async (origin, destination) => {
    if(!origin || !destination){
        throw new Error('Origin and destination are required');
    }

    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    const url = `https://maps.gomaps.pro/maps/api/distancematrix/json?destinations=${encodeURIComponent(destination)}&origins=${encodeURIComponent(origin)}&key=${apiKey}`;

    

    try {
        const response = await axios.get(url);
        if(response.data.status === 'OK'){
            if(response.data.rows[ 0 ].elements[ 0 ].status === 'ZERO_RESULTS'){
                throw new Error("no routes found")
            }
            return response.data.rows[ 0 ].elements[ 0 ];
        }else{
            console.error('API responded with an error:', response.data);
            throw new Error("Error getting distance");
        }
        
    } catch (err) {
        console.log(err);
    }
}

module.exports.getAutoSuggestions = async (input) => {
  if(!input){
    throw new Error('Input is required');
  }
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  const url = `https://maps.gomaps.pro/maps/api/place/autocomplete/json?input=${input}&key=${apiKey}`;

  try {
    const response = await axios.get(url);
    if(response.data.status === 'OK'){
      return response.data.predictions;
    }else{
      console.error('API responded with an error:', response.data);
      throw new Error("Error getting suggestions");
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
}

module.exports.getCaptainInTheRadius = async (ltd, lng, radius) => {
  console.log("getcap", ltd, lng, radius);
  if(!ltd || !lng || !radius){
    throw new Error('Coordinates and radius are required');
  } 
  try {
  
    const captains = await captainmodel.find({
      location: {
        $geoWithin: {
          $centerSphere: [[lng, ltd], radius / 6371]
        }
      }
    });
    console.log(captains);
    return captains;
  } catch (err) {
    console.log(err);
    throw err;
    
  }
}