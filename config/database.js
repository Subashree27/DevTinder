const mongoose = require('mongoose');
const connectDB = async()=>{
    await mongoose.connect("mongodb://localhost/Practice");
    
}

module.exports= connectDB;