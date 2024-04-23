require('dotenv').config();

const express = require('express')
const mongoose = require("mongoose")
const cors = require("cors")
const app = express()
const createHttpError = require('http-errors')
app.use(express.json())
app.use(cors())


const userRouter = require("../routes/user");
const orderRouter =require("../routes/order");
const paymentRouter= require("../routes/payment");
const messageRouter= require("../routes/message");

const port = process.env.PORT 


app.get('/',(req,res,next) => {
  try {

    throw createHttpError(500,'BROKEN')
  } catch (error){
    next(error)
  }
})

app.use((err,req,res,next)=>{
  if (createHttpError.isHttpError(err)){
    res.status(err.status).send({message : err.message})
  }
  else {
    res.status(500).send({message:err.message})
  }
  res.status(500).send({message:"Error Unknown"})
})


mongoose.connect(
  process.env.MONGO_URL,
  {}).then(result =>{
    console.log("db connected")
    app.listen(port, ()=>{
      console.log("server is running")
    })
  }).catch(err => console.log(err))


app.use ("/user",userRouter);
app.use ("/order",orderRouter );
app.use ("/payment",paymentRouter);
app.use ("/message",messageRouter);

