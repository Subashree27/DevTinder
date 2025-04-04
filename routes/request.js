const express = require('express');
const requestRouter = express.Router();
const User = require("../src/models/user")
const ConnectionRequest = require('../src/models/connectionRequest')
const {userAuth} = require("../middlewares/auth");
const { connection } = require('mongoose');
const {validateSignupData,validateEditProfile} = require("../utils/validation");

// requestRouter.post('/sendConnectionRequest',userAuth,async(req,res,next)=>{
//     const user = req.user;
//     console.log("Connection Established");
    
// });

requestRouter.post('/request/send/:status/:userId', userAuth, async (req, res) => {
    try {
        const fromUserId = req.user._id;
        const toUserId = req.params.userId;
        const status = req.params.status;

        const allowedStatus = ["ignored", "interested"];
        if (!allowedStatus.includes(status)) {
            return res.status(400).json({ message: "Invalid status type", status });
        }

        // Check if it is an an External userid
        const toUser = await User.findById(toUserId);
            if(!toUser){
                return res.send(404).json({message:"User not found"});
            }

        // Check if a connection request already exists
        const existingRequest = await ConnectionRequest.findOne({
            $or: [
                { fromUserId, toUserId },  // Eg:fromUserId:Suba wants to connect with 
                // toUserId:Shree this data already exists
                { fromUserId: toUserId, toUserId: fromUserId } // Then If Shree wants to 
                // connected with Suba the details gets Repeated
            ]
        });

        if (existingRequest) {
            return res.status(400).json({ message: "Connection request already exists." });
        }

        // Save new connection request
        const connectionRequest = new ConnectionRequest({ fromUserId, toUserId, status });
        const data = await connectionRequest.save();

        return res.status(201).json({
            message: "Connection Request Sent Successfully!",
            data,
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
});


module.exports = requestRouter;
