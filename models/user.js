const mongoose = require('mongoose')

const userSchema =  new mongoose.Schema({
   
    username: { 
        type: String,
    },
    email: { 
        type: String, 

    },
    password: { 
        type: String, 
    },
    savedOrders:[{type: mongoose.Schema.Types.ObjectId, ref:"order"}],
})

const userModel = mongoose.model("user", userSchema)
module.exports =userModel