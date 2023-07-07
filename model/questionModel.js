const mongoose=require('mongoose');
const questionTable=mongoose.Schema(
    {
        question:{
            type:String,
            required:[true,'please provide the question'],
            trim:true,
            unique:true,
        },
        options:{
            type:[String],
            required:true
        },
        answer:{
            type:[String],
            required:[true,'please provide the answer']
        }
    }
);
const Questions=mongoose.model("questions",questionTable);
module.exports=Questions;