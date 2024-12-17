const dotenv = require("dotenv");
dotenv.config();
const express = require("express")
const app = express();
const cors = require('cors')
const connectToDB = require('./database/dbConfig')
const userRoutes = require('./routes/user.routes')

connectToDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get('/', (req,res)=>{
    res.send("Hello from uber")
})

app.use('/users',userRoutes)

module.exports = app;