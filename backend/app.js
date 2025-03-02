const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const cors = require('cors');
const connectToDB = require('./database/dbConfig');
const cookieParser = require('cookie-parser'); 


// routers
const userRoutes = require('./routes/user.routes');
const captainRoutes = require('./routes/captain.routes');
const mapsRoutes = require('./routes/maps.routes');
const rideRoutes = require('./routes/rides.routes');



connectToDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); // Correct usage

app.get('/', (req, res) => {
    res.send("Hello from uber");
});


// routes 
app.use('/users', userRoutes);
app.use('/captains', captainRoutes);
app.use('/maps', mapsRoutes);
app.use('/rides',rideRoutes)


module.exports = app;
