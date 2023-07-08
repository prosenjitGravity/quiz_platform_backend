const jwt = require("jsonwebtoken");
const User = require("../model/userModel");

const registeredUser = async (req, res, next) => {
  try {
    console.log("the auth req.cookie is : ",req.cookies);
    const token = req.cookies?.token;
    console.log("the auth token is ", token);
    if (!token || typeof token== undefined) {
      res.status(200).json({ status: 0, msg: "user not logged in " });
      return;
    }
    console.log(" toke is ..."+ typeof token)



    const verified = jwt.verify(token, process.env.JWT_SECRET);
    console.log('the verified is  : '+verified);
    const user = await User.findById(verified.id);
    console.log('the user is : '+user);
    if (!user && user==undefined) {
      res.status(200).json({ status: 0, msg: "user not logged in " });
      return;
    }
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: 0, msg: "user not logged in " });
    console.error(error);
  }
};
module.exports = registeredUser;
