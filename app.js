const express = require('express');
const mongoose = require('mongoose');
const app = express();
const connectDB = require('./config/database');
const validator = require("validator");
const jwt = require("jsonwebtoken")
const cookieParser = require("cookie-parser")
app.use(cookieParser())
app.use(express.json())
const {userAuth} = require('./middlewares/auth')
const authRouter = require('./routes/auth');
const profileRouter = require('./routes/profile');
const requestRouter = require('./routes/request');
// const profileAuth = require('./routes/profile');

app.use("/",authRouter)
app.use("/",profileRouter)
app.use("/",requestRouter)

connectDB().then(()=>{
    console.log("Database connection established");
    app.listen(7777, () => {
        console.log("Server Connected");
    });    
}). catch((err)=>{
    console.log("Database cannot be established");
});

