const mongoose = require("mongoose")
const validator = require("validator")

const validateSignupData = (req) => {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName) {
        throw new Error("First name and last name are required");
    }

    if (!email || !validator.isEmail(email)) {
        throw new Error("Valid email is required");
    }

    if (!password || password.length < 8) {
        throw new Error("Password must be at least 8 characters");
    }

    return true;
};

const validateEditProfile = (req)=>{
        const allowedEditFields = ["firstName","lastName","email","age","gender","photoURL","about","skills"]
        const isAllowedtoEdit= Object.keys(req.body).every(field=>
            allowedEditFields.includes(field)) 
        return isAllowedtoEdit;

    }
    
   
module.exports = {validateSignupData,validateEditProfile};