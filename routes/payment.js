const express = require('express');
const router = express.Router();
const Payment = require('../models/payment'); 


router.post('/', async (req, res) => {
  try {
   
    const newPayment = new Payment({
      customername: req.body.customername,
      address: req.body.address,
      contactno: req.body.contactno,
      cardholdername: req.body.cardholdername,
      bankname: req.body.bankname,
      accountno: req.body.accountno,
    });


    const savedPayment = await newPayment.save();


    res.status(201).json({
      message: 'Payment saved successfully',
      payment: savedPayment,
    });
  } catch (error) {
   
    console.error(error);
    res.status(500).json({ error: 'An error occurred while processing your payment.' });
  }
});


router.get('/payments', async (req, res) => {
  try {
    const payments = await Payment.find();
    res.status(200).json(payments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching payment details.' });
  }
});

router.delete('/payments/:paymentId', async (req, res) => {
  const paymentId = req.params.paymentId;

  try {
    const deletedPayment = await Payment.findByIdAndDelete(paymentId);

    if (!deletedPayment) {
      return res.status(404).json({ message: 'Payment not found' });
    }

    res.status(200).json({ message: 'Payment deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while deleting the payment.' });
  }
});

module.exports = router;
