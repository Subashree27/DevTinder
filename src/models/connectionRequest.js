const mongoose = require('mongoose');
const connectionRequestSchema = new mongoose.Schema({
    fromUserId:{
        type:mongoose.Types.ObjectId,
        required:true
    },
    toUserId:{
        type:mongoose.Types.ObjectId,
        required:true
    },
    status:{
        type:String,
        enum:{
            values:["ignored","interested","accepted","rejected"],
            message:`{values} is not valid`
            },
        
        }
    },
    {
        timestamps:true
    }
);
connectionRequestSchema.pre("save",function(next){
       const connectionRequest = this;
       if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)) {
        throw new Error("Cannot send connection Request to Yourself")
       }
       next();
})

const ConnectionRequest = mongoose.model("ConnectionRequest", connectionRequestSchema);

module.exports = ConnectionRequest;

