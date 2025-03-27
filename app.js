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
app.post('/signup', async (req, res) => {
    try {
        console.log("Incoming signup request: ", req.body);
        
        validateSignupData(req);
        
        const { firstName, lastName, email, password } = req.body;
        const existingUser = await User.findOne({ email });
        
        if (existingUser) {
            return res.status(400).send("Email already in use");
        }
        
        const passwordHash = await bcrypt.hash(password, 10);
        
        const user = new User({
            firstName,
            lastName,
            email,
            password: passwordHash,
        });
        
        await user.save();
        console.log("User created successfully!");
        res.status(201).send("User Created Successfully");
    } catch (err) {
        console.error("Signup error:", err);
        res.status(400).send(`Failed to create user: ${err.message}`);
    }
});


app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            throw new Error("Email ID is not valid");
        }

        const isPasswordValid = await user.validatePassword(password);
        if (isPasswordValid) {
            // Creating JWT token
            const token = await user.getJWT();
            res.cookie("token", token);
            return res.send("Login Successful"); 
        } else {
            throw new Error("Invalid Credentials");
        }
    } catch (err) {
        res.status(400).send("Error: " + err.message);
    }
});


app.get('/profile',userAuth,async(req,res)=>{
    try{
        const user = req.user
        res.send(user);
    }
    catch(err){
        res.status(404).send(" Not a Invalid Credentials")

    }
    });
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


