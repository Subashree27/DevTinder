
   # 1.const cookies = req.cookies
        const {token} = cookies; // Token is inside cookies so we are extracting token from cookies
   # 2.if(!token){
        throw new Error("Invalid Token");  // If the token is not matched, it throws an Error
    }
   # 3.validating the token  
    const decodedObj = await jwt.verify(token,'Dev@Tinder',{expiry:'1d'}); 
    // (Dev@Tinder - SecretKey),and the token has to be expired in (1 day-->('1d'))

   # 4.const {_id} = decodedObj;      //destructuring id from decodedObj 

   # 5. const user = await User.findById(_id);  // Checks the user by _id

   # 6. if(!user){             // if the user is matched it throws an Error
        throw new Error("Invalid User");
    }
   
# If we give
   git diff ---> there comes an : if we press q it will be gone
   
