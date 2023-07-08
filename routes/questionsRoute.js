const express=require('express');
const router=express.Router();
const {getQuestion,createQuestion,updateQuestions,deleteQuestion,getResult,getQuestionForUser}=require('../controller/questionController');

router.get('/',getQuestion);
router.get('/get-question',getQuestionForUser);
router.post('/create',createQuestion);
router.put("/:id",updateQuestions);
router.post("/check",getResult);
router.delete('/:id',deleteQuestion);
module.exports=router;