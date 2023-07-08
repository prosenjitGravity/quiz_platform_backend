const mongoose=require('mongoose');
const  UserTable=mongoose.Schema({
    first_name:{
        type:String,
        required:[true,'please provide the first name'],
        trim:true,
    },
    last_name:{
        type:String,
        required:[true,'please provide the last name'],
        trim:true
    },
    email:{
        type:String,
        required:[true,'please provide the email address'],
        trim:true,
        unique:true
    },
    phone:{
        type:String,
        required:[true,'please provide the phone number'],
        trim:true,
        unique:true
     },
    gender:{
        type:String,
        required:[true,'provide the gender'],
        trim:true,

    },
    password:{
        type:String,
        required:[true,'please provide the password'],
        trim:true,
        unique:true
    },
});
const User=mongoose.model('User',UserTable);
module.exports=User