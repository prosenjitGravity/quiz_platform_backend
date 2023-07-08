const mongoose=require('mongoose');
const resultTable=mongoose.Schema(
    {
        first_name:{
            type:String,
            required:[true,'please provide the first_name'],
            trim:true
        },
        last_name:{
            type:String,
            required:[true,'please provide the lastname'],
            trim:true
        },
        email:{
            type:String,
            required:[true,'please provide the email'],
            trim:true
        },
        phone:{
            type:String,
            required:[true,'please provide the phone'],
            trim:true
        },
        gender:{
            type:String,
            required:[true,'please provide the gender'],
            trim:true
        },
        score:{
            type:String,
            required:[true,'please provide the score'],
            trim:true
        }
    }
);
const Results=mongoose.model('result',resultTable);
module.exports=Results;