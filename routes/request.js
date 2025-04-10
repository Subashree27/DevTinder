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
        const data = await connectionRequest.save(); // error thrown here


        return res.status(201).json({
            message: "Connection Request Sent Successfully!",
            data,
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});
const mongoose = require("mongoose");

requestRouter.post('/request/review/:status/:requestId', userAuth, async (req, res) => {
        try{
    // check the connectionRequest from Mongodb(Vicky => shreenidhi)
    // is LoggedInUser ==> shreenidhi
    // here shreenidhi is a receiver when she login she receive the request from Vicky  
        const loggedInUser = req.user; // We the user login to see whom have given request
        const { status, requestId } = req.params; 
        const allowedStatus =["accepted","rejected"];
        
        if (!allowedStatus.includes(status)) {
            return res.status(400).json({ message: "Status not allowed" });
        }

        const connectionRequest = await ConnectionRequest.findOne({
            _id: requestId,  // requestId =>connectionRequest ->pass->_id
            toUserId: loggedInUser._id, // ensure this request was sent to the logged-in user
            status: "interested",
        });

        if (!connectionRequest) {
            return res.status(404).json({ message: "Connection Request not found" });
        }

        connectionRequest.status = status;
        const updatedRequest = await connectionRequest.save();

        return res.status(200).json({
            message: `Connection Request ${status} successfully.`,
            data: updatedRequest
        });
       

    } catch (err) {
        console.error("Error updating connection request:", err);
        return res.status(500).send("ERROR: " + err.message);
    }
});


module.exports = requestRouter;
