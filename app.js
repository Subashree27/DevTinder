const express = require('express');
const mongoose = require('mongoose');
const app = express();
const connectDB = require('./config/database');
const User = require('./src/models/user')
const validateSignupData = require("./utils/validation");
const bcrypt = require("bcrypt")
const validator = require("validator");
const jwt = require("jsonwebtoken")
const cookieParser = require("cookie-parser")
const {userAuth} = require("./middlewares/auth")

app.use(cookieParser())
app.use(express.json())



app.post('/sendConnectionRequest',userAuth,async(req,res,next)=>{
        const user = req.user;
        console.log("Connection Established");
        res.send(user.firstName+" sent the connection request")
    });
connectDB().then(()=>{
    console.log("Database connection established");
    app.listen(7777, () => {
        console.log("Server Connected");
    });    
}). catch((err)=>{
    console.log("Database cannot be established");
});


