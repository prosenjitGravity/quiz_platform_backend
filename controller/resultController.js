const Results=require('../model/resultModel');

const getResult=async(req,res)=>{
    try{
        const results= await Results.find();
        console.log(results);
        res.status(200).json({status:1,msg:results});
    }catch(error){
        console.log(error);
        res.status(400).json({status:0,msg:error});
    }
};
const createResult=async (req,res)=>{
    try{
        console.log(req.body);
        const results=await Results.create(req.body);
        res.status(200).json({status:1,msg:results});
    }catch(error){
        console.log(error);
        res.status(400).json({status:0,msg:error});
    }
};
module.exports={getResult,createResult};