const mongoose = require ("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
// userId:{
//     type: Schema.Types.ObjectId,
//    // required :true,
// },

product : {
    type: String,
    required :true,
}, 
quantity: {
    type: Number,
    required :true,
},
price : {
    type: Number,
    required :true,
},
// userOwner:{type:mongoose.Schema.Types.ObjectId,
//     ref:"user"},

});

const Order = mongoose.model('order', orderSchema);
module.exports =Order;