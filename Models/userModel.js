const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
   
   
    FirstName:{
        type:String,
        required:true,
        trim:true
    },
    LastName:{
        type:String,
        required:true,
       
    },

    Email : {
        type : String,
        required : true,
        unique : true
    },

    Mobile:{
        type:Number,
        required : true 
    },

    Role:{
        type:Number,
        
    },
    
    Password:{
        type:String,
        required:true,
       
    },
    
   
},
    {timestamps: true}
)

module.exports = mongoose.model("User",userSchema)