const Admin=require('../model/adminModel');
const jwt = require("jsonwebtoken");

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
  };
  const getAdmin=async (req,res)=>{
    try{
        const admin=await Admin.find();
        res.status(200).json({status:1,msg:admin});
    }catch(error){
        console.log(error);
        res.status(400).json({status:0,msg:error})
    }
  };
  const getWithToken=async(req,res)=>{
    const token1 = req.headers.authorization ||req.query.token;
    const token = token1.replace("Bearer ", "");

    // token = token.replace("b", "");
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
      Admin.findById(userId.id)
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
  }

const registerAdmin = async (req, res) => {
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
  const adminExists = await Admin.findOne({ email });
  if (adminExists) {
    res.status(404).json({ msg: "you are already registered" });
    return;
  }
  try {
    const admin = await Admin.create(req.body);
    res.status(201).json(admin);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
const loginAdmin = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      res
        .status()
        .json({ status: 0, msg: "please enter a valid email and password",email });
      return;
    }
    const adminExists = await Admin.findOne({ email });
    if (!adminExists) {
      res
        .status(404)
        .json({status: 0,msg: "you are not registered admin. please Register."});
      return;
    }
    let token = generateToken(adminExists._id);
    res.cookie("token", token, {
      path: "/",
      httpOnly: true,
      expire: new Date(Date.now() + 1000 * 300), // 5 minutes
      sameSite: "none",
      secure: false,
    });
    // console.log(" the res.cookie is  : " + res.cookie);
    res.status(200).json({ admin: adminExists, token });
  };
  module.exports={
    getAdmin,
    registerAdmin,
    loginAdmin,
    getWithToken
  }