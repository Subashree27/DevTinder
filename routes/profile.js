const express = require('express');
const profileRouter = express.Router();
// const User = require("../src/models/user")
const {userAuth} = require("../middlewares/auth")

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
        
    }
    catch(err){

    }
})


    module.exports= profileRouter;