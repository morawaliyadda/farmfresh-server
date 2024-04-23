const express = require("express");
const userModel= require('../models/user');


const router =express.Router();

router.post("/signin",(req,res)=>{
    const {username,password} = req.body;
    userModel.findOne({username})
    .then(person=>{
      if(person){
        if(person.password === password){
          res.json("Success")
        }else{
          res.json("The password is incorrect")
        }
      }else{
        res.json("No record existed")
      }
    })
  });
  
  router.post("/signup",async(req,res,next) =>{
    console.log(req.body)
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    try{
        const user =  userModel.findOne({email});
    if(!user){
        return res.status(400).json({message:"email exist"});
    }
    const newuser = new userModel({
        username:username,
        email:email,
        password:password
    })
    const result = await newuser.save();
    res.status(201).send(result);
    }catch(error)
    {next(error)}
    
}) ; 

  router.delete("/:userId", async (req, res) => {
    const userId = req.params.userId;

    try {
        const deletedUser = await userModel.findByIdAndDelete(userId);

        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.get("/user", async (req, res) => {
  try {
      const users = await userModel.find();
      const usersWithOrders = await Promise.all(
          users.map(async (user) => {
              const populatedUser = await userModel
                  .findById(user._id)
                  .populate('savedOrders', 'name count price');
              return {
                  user: {
                      _id: user._id,
                      name: user.username,
                      email: user.email
                  },
                  savedOrders: populatedUser.savedOrders
              };
          })
      );
      res.status(200).json(usersWithOrders);
  } catch (err) {
      res.status(500).json({ message: 'Internal server error' });
  }
});

// In your user router (user.js)
router.get("/allUsers", async (req, res) => {
  try {
    const users = await userModel.find({}, "username email"); // You can specify which fields you want to retrieve
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

  module.exports =router;

  