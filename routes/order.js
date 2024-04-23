const express= require("express")

const userModel = require("../models/user") 
const orderModel = require("../models/order");

const router = express.Router();



// Create a new order

router.post("/",async (req, res) => {
    console.log(req.body)
    const order = new orderModel ({
        
    /*userId : req.body.userId,*/
    quantity : req.body.quantity,
    product : req.body.product,
    price : req.body.price,

    });

    try {
        const result = order.save();  
        res.status(201).json({result})
    } catch (err) {
        res.status(500).json(err);
    }
});
// read

router.get("/orders",async(req,res)=>{
    try{
        const result = await orderModel.find(); 
        res.status(200).json(result);
        console.log(result);
    } catch (err) {
        res.status(500).json(err);
    }
})

// Get oder by id
router.get("/:orderId", async (req, res) => {
    try {
        const order = await orderModel.findById(req.params.orderId);

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.status(200).json({ order });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// place a Oder

router.put("/",async (req,res,next)=>{
    const order =await orderModel.findById(req.body.orderId)
    const user = await userModel.findById(req.body.userId)
    try {
        if (!user.savedOrders) {
            user.savedOrders = [];  
        }
    
        user.savedOrders.push(order);  
        await user.save();
    
        res.status(201).json({ savedOders: user.savedOrders });
    } catch (err) {
        next(err);
        res.status(500).json(err);
    }
});

//Get oders of user

router.get("/savedOders/:userId",async (req,res)=>{
    try {  
        const user = await userModel.findById(req.params.userId)
            .populate('savedOders', 'product quantity totalprice'); 

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const orders = user.savedOders.map(order => ({
            product: order.product,
            quantity: order.quantity,
            price: order.totalprice  
        }));
        
        res.status(200).json({ savedOders: orders });
        
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
})

//delete a order by id
router.delete("/:orderId", async (req, res) => {
    const orderId = req.params.orderId;

    try {
      
        const deletedOrder = await orderModel.findByIdAndDelete(orderId);

        if (!deletedOrder) {
            return res.status(404).json({ message: 'Order not found' });
        }

    
        const user = await userModel.findById(deletedOrder.userOwner);
        if (user) {
            user.savedOders = user.savedOders.filter(savedOrderId => savedOrderId.toString() !== orderId);
            await user.save();
        }

        res.status(200).json({ message: 'Order deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
});
module.exports =router;
