const Questions=require("../model/questionModel");


const getQuestion=async(req,res)=>{
    try{
        let question= await Questions.find();
        console.log(question)
        res.status(200).json({status:1,msg:question});
    }catch(error){
        console.log(error);
        res.status(400).json({status:0,msg:error});
    }
};

const getQuestionForUser=async(req,res)=>{
    try{
        let question= await Questions.find();
        res.status(200).json({status:1,msg:question.map(que => que ? {_id: que._id, question: que.question, options: que.options, answer: []} : que)});
    }catch(error){
        console.log(error);
        res.status(400).json({status:0,msg:error});
    }
};

const getResult=async (req,res)=>{
    try{
        console.log(req.body);
        let question = await Questions.find();
        let answeredQuestions = req.body.answers;
        let correctAnswer = 0;
        let wrongAnswer = 0;
        answeredQuestions.map( answer =>{
            question.map( que => {
                if(que.question == answer.question){
                    if(que.answer.includes(answer.answer)){
                        correctAnswer = correctAnswer + 1;
                    } else {
                        wrongAnswer = wrongAnswer + 1;
                    }
                }
            })
        })
        res.status(200).json({status:1,correctAnswer: correctAnswer, wrongAnswer: wrongAnswer});
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
module.exports={getQuestion,createQuestion,updateQuestions,deleteQuestion,getResult ,getQuestionForUser};