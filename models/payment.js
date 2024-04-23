const mongoose = require ("mongoose");
const Schema = mongoose.Schema;

const paymentSchema = new Schema({
customername:{
    type:String,

},
address: {
    type: String,

},
contactno : {
    type: String,

},
cardholdername : {
    type :String,

},
bankname :{
    type : String,

},
accountno : {
    type : Number,

}

});
const Payment = mongoose.model('payment', paymentSchema);
module.exports =Payment;