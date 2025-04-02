const express = require('express');
const profileAuth = express.Router();

profileAuth.get('/profile',userAuth,async(req,res)=>{
    try{
        const user = req.user
        res.send(user);
    }
    catch(err){
        res.status(404).send(" Not a Invalid Credentials")

    }
    });

module.exports= profileAuth;