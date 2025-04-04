const express = require('express');
const authRouter = express.Router();
const { validateSignupData } = require("../utils/validation");
const User = require('../src/models/user')
const bcrypt = require("bcrypt")
const validator = require('validator')


authRouter.post('/signup', async (req, res) => {
    try {
        console.log("Incoming signup request: ", req.body);
        
        validateSignupData(req);
        
        const { firstName, lastName, email, password, about,age,gender,photoURL,skills} = req.body;
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
            about,
            age,
            gender,
            photoURL,
            skills
        });
        
        await user.save();
        console.log("User created successfully!");
        res.status(201).send("User Created Successfully");
    } catch (err) {
        console.error("Signup error:", err);
        res.status(400).send(`Failed to create user: ${err.message}`);
    }
});

authRouter.post('/login', async (req, res) => {
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


// I'm telling to empty the token -->In PostMan the cookies which contains token gets Empty
authRouter.post('/logout',async(req,res)=>{
    res.cookie("token",null,{
        expires:new Date(Date.now()),
    });
    res.send("Logged out successfully....");
})
module.exports = authRouter;