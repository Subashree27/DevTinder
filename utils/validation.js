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

module.exports = validateSignupData;