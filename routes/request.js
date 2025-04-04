const express = require('express');
const requestRouter = express.Router();
// const User = require("../src/models/user")
const {userAuth} = require("../middlewares/auth");

requestRouter.post('/sendConnectionRequest',userAuth,async(req,res,next)=>{
    const user = req.user;
    console.log("Connection Established");
    res.send(user.firstName+" sent the connection request")
});

module.exports = requestRouter;
