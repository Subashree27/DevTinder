const jwt = require('jsonwebtoken')
const User = require('../src/models/user')
const userAuth = async (req,res,next)=>{
    try
    {
    const cookies = req.cookies
    const {token} = cookies; // Token is inside cookies so we are extracting token from cookies
    if(!token){
        throw new Error("Invalid Token"); 
    }
    // validating the token  
    const decodedObj = await jwt.verify(token,'Dev@Tinder',{expiry:'1d'}); 
    const {_id} = decodedObj;      
    const user = await User.findById(_id);  
    if(!user){          
        throw new Error("Invalid User");
    }
    req.user = user;
    next();
}
catch(err){
    res.status(404).send('ERROR:'+err.message)
}
}

module.exports = {userAuth};


