const express=require('express');
const router=express.Router();
const {getResult,createResult}=require('../controller/resultController');


router.get('/',getResult);
router.post('/create',createResult);
module.exports=router;