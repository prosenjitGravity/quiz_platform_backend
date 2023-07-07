const jwt = require("jsonwebtoken");
const Admin = require("../model/adminModel");

const registeredAdmin = async (req, res, next) => {
  try {
    console.log("the auth req.cookie is : ",req.cookies);
    const token = req.cookies?.token;
    console.log("the auth token is ", token);
    if (!token || typeof token== undefined) {
      res.status(200).json({ status: 0, msg: "admin not logged in " });
      return;
    }
    console.log(" toke is ..."+ typeof token)



    const verified = jwt.verify(token, process.env.JWT_SECRET);
    console.log('the verified is  : '+verified);
    const admin = await Admin.findById(verified.id);
    console.log('the admin is : '+admin);
    if (!admin && admin==undefined) {
      res.status(200).json({ status: 0, msg: "admin not logged in " });
      return;
    }
    req.admin = admin;
    next();
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: 0, msg: "admin not logged in " });
    console.error(error);
  }
};
module.exports = registeredAdmin;
