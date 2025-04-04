const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true,
        // validate(value){
        //     if(!validator.isEmail(value)){
        //         throw new Error("Invalid Email");
        //     }
        // }
     },
    password: { type: String, required: true },
    age:{ type:Number},
    gender:{type:String,
        // validate(value){
        //     if(!["male","female","others"].includes(value)){
        //         throw new Error("Gender data is not valid")
        //     }
        // }
    },
    photoURL:{type:String},
    about:{type:String,default:"This is my about page"},
    skills:{type:Array}

});

userSchema.methods.getJWT = function () {
    const user = this;
    const token = jwt.sign({_id: user._id}, "Dev@Tinder", {expiresIn: '2d'}); 
    return token;
};

userSchema.methods.validatePassword = async function(passwordInputByUser) {
    const user = this;
      // Comparing (password-->user password by Input, user.password-->Hash code(enb#//edsbd@?(*$85))
    return await bcrypt.compare(passwordInputByUser, user.password);
};

module.exports = mongoose.model('User', userSchema);
