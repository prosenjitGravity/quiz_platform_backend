const User=require('../model/userModel');
const jwt = require("jsonwebtoken");


const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
};
const getUser=async (req,res)=>{
    try{
      const user=await User.find();
      res.status(200).json({status:1,msg:user})
    }catch(error){
      console.log("getUser error"+error);
      res.status(400).json({status:0,msg:error});
    }
};
  const getWithToken=async(req,res)=>{
    const token1 = req.headers.authorization ||req.query.token;
    const token = token1.replace("Bearer ", "");
    console.log("token : ",token);
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: 'Failed to authenticate token' });
      }
      const userId = decoded;
      console.log('user_id : ',userId.id)
      User.findById(userId.id)
      .then(user => {
        if (!user) {
          return res.status(404).json({status :0, error: 'User not found' });
        }
  
        // Return the user data in the response
        res.json({status:1,msg:user});
      })
      .catch(error => {
        res.status(500).json({ error: 'An error occurred while fetching the user' });
      });
  });
  };

  const registerUser = async (req, res) => {
    const {
      first_name,
      last_name,
      email,
      phone,
      password,
    } = req.body;
    if (!first_name || !last_name || !email || !password) {
      res.status(404).json({ msg: "please entre the required fields" });
      return;
    }
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(404).json({ msg: "you are already registered" });
      return;
    }
    try {
      const user = await User.create(req.body);
      res.status(201).json(user);
    } catch (error) {
      console.log(error);
      res.status(400).json({});
    }
  };
  const loginUser = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      res
        .status()
        .json({ status: 0, msg: "please enter a valid email and password",email });
      return;
    }
    const userExists = await User.findOne({ email });
    if (!userExists) {
      res
        .status(404)
        .json({status: 0,msg: "you are not registered user please Register."});
      return;
    }
    let token = generateToken(userExists._id);
    res.cookie("token", token, {
      path: "/",
      httpOnly: true,
      expire: new Date(Date.now() + 1000 * 300), // 5 minutes
      sameSite: "none",
      secure: false,
    });
    // console.log(" the res.cookie is  : " + res.cookie);
    res.status(200).json({ user: userExists, token });
  };
const logOutUser = (req, res) => {
    console.log("logout called....");
    try {
      res.cookie("token", null, {
        path: "/",
        httpOnly: true,
        expires: new Date(0),
        sameSite: "none",
        secure: true,
      });
      // console.log("the user cookie is : "+res.cookie)
      res.status(200).json({ msg: "logout successfully" });
    } catch (error) {
      console.log(error);
      res.status(400).json({ msg: error });
    }
  };
  const userProfile = (req, res) => {
    console.log("the userProfile is called");
    // console.log(req.alumni)
    res.status(200).json(req.alumni);
  };
module.exports  ={getUser,getWithToken,registerUser,loginUser,logOutUser,userProfile};