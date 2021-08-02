const mongoose=require('mongoose')


const userSchema=mongoose.Schema({    
    name:{
        type:String,
        required:true 
    },
    phone:{
        type:Number,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
})

const User=mongoose.model('Users',userSchema);
module.exports=User

