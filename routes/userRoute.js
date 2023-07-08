const express=require('express');
const router=express.Router();

const {registerUser,getUser,getWithToken,loginUser,userProfile,logOutUser}=require('../controller/userController');
const is_Registered=require('../middlewares/userAuthMiddleware');
router.get("/",getUser);
router.get("/my-profile",getWithToken);
router.post("/register",registerUser);
router.post("/login",loginUser);
router.post("/logout",logOutUser);
router.get("/profile",is_Registered,userProfile)

module.exports=router; 