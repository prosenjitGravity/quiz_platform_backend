const Questions=require("../model/questionModel");


const getQuestion=async(req,res)=>{
    try{
        const question= await Questions.find();
        res.status(200).json({status:1,msg:question});
    }catch(error){
        console.log(error);
        res.status(400).json({status:0,msg:error});
    }
};

const createQuestion=async (req,res)=>{
    try{
        console.log(req.body);
        const question=await Questions.create(req.body);
        res.status(200).json({status:1,msg:question});
    }catch(error){
        console.log(error);
        res.status(400).json({status:0,msg:error});
    }
};
const updateQuestions=async (req,res)=>{
    try{
        let question=await Questions.findByIdAndUpdate(req.params.id,req.body);
        console.log('question : ',question);
        res.status(200).json({status:1,msg:question});
    }catch(error){
        console.log(error);
        res.status(400).json({status:0,msg:error});
    }
};
const deleteQuestion=async(req,res)=>{
    try{
        let question=await Questions.findByIdAndRemove(req.params.id);
        console.log('delete : ',question);
        res.status(200).json({status:1,msg:question});
    }catch(error){
        res.status(400).json({status:0,msg:error});
    }
}
module.exports={getQuestion,createQuestion,updateQuestions,deleteQuestion};