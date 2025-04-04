const express = require('express');
const profileRouter = express.Router();
// const User = require("../src/models/user")
const {userAuth} = require("../middlewares/auth")
const {validateEditProfile}= require('../utils/validation')
const router = express.Router();

profileRouter.get('/profile/view',userAuth,async(req,res)=>{
    try{
        const user = req.user
        res.send(user);
    }
    catch(err){
        res.status(404).send(" Not a Invalid Credentials")

    }
    });

profileRouter.patch('/profile/edit',userAuth,async(req,res)=>{
    try{
        if(!validateEditProfile(req)){
            throw new Error("ValidateEditProfile cannot be Edited");
        }
        const loggedInuser = req.user; // This is in Validation,User who logged in details will be collected 
        // console.log(loggedInuser);
        Object.keys(req.body).forEach((key)=>(loggedInuser[key]=req.body[key]))
        // console.log(loggedInuser);
        await loggedInuser.save();

        res.send(`${loggedInuser.firstName},your profile was updated Successfully`)
    }
    catch(err){
        res.send("ERROR:"+err.message) 
    }
})




    module.exports= profileRouter;