const express=require('express')
const router=express.Router();;
const {getAdmin,registerAdmin,loginAdmin,getWithToken}=require('../controller/adminController');

const registeredAdmin=require('../middlewares/adminAuthMiddleware');


router.get('/',getAdmin);
router.post('/register',registerAdmin);
router.post('/login',loginAdmin);
router.get('/profile',getWithToken);

module.exports=router;