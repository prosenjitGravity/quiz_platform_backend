const express=require('express');
const router=express.Router();
const {getQuestion,createQuestion,updateQuestions,deleteQuestion}=require('../controller/questionController');

router.get('/',getQuestion);
router.post('/create',createQuestion);
router.put("/:id",updateQuestions);
router.delete('/:id',deleteQuestion);
module.exports=router;