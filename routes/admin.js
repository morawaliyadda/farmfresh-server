const adminModel= require('../models/admin');


const router =express.Router();

router.post("/signin",(req,res)=>{
    const {username,password} = req.body;
    adminModel.findOne({username})
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
    const password = req.body.password;

    try{
        const user =  adminModel.findOne({email});
    if(!user){
        return res.status(400).json({message:"email exist"});
    }
    const newuser = new adminModel({
        username:username,
        password:password
    })
    const result = await newuser.save();
    res.status(201).send(result);
    }catch(error)
    {next(error)}
    
}) ;

  module.exports =router;