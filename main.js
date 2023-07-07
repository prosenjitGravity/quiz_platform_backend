const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors');
const dotenv = require("dotenv").config();
const cookieParser=require('cookie-parser')
const app=express();
const PORT=3002;


//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended:false}));
app.use(cors("*"));
app.use(cookieParser());

// Routes
const questionsRouter=require('./routes/questionsRoute');
const adminRouter=require('./routes/adminRoute');


//Routes Middleware
app.get('/',(req,res)=>{
    res.send("Hello I'm Express");
});
app.use("/question",questionsRouter);
app.use("/admin",adminRouter);




mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB server is connected. Ready to use')
    app.listen(PORT, () => {
      console.log(`The server is running on port ${PORT}`);
    });
  })
  .catch((exception) => {
    console.error(exception);
  });