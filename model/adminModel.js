const mongoose=require('mongoose')
const adminTable=mongoose.Schema(
    {
        first_name:{
            type:String,
            required:[true,'please provide the first_name'],
            trim:true,
        },
        last_name:{
            type:String,
            required:[true,'please provide the last_name'],
            trim:true,
        },
        email:{
            type:String,
            required:[true,'please provide the email'],
            trim:true,
            unique:true
        },
        phone:{
            type:String,
            required:[true,'please provide the phone number'],
            trim:true,
            unique:true
        },
        password:{
            type:String,
            required:[true,'please provide the password'],
            trim:true,
        }
    }
);
const Admin=mongoose.model('admin',adminTable);
module.exports=Admin;