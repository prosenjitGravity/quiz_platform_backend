const express=require('express');
const router=express.Router();
const {getQuestion,createQuestion,updateQuestions,deleteQuestion,getQuestionForUser}=require('../controller/questionController');

router.get('/',getQuestion);
router.get('/get-question',getQuestionForUser);
router.post('/create',createQuestion);
router.put("/:id",updateQuestions);
router.delete('/:id',deleteQuestion);
module.exports=router;