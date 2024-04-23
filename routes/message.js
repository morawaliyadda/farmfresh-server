const express = require('express');
const router = express.Router();
const Message = require('../models/message'); 


router.post('/', async (req, res) => {
  try {
   
    const newMessage = new Message({
      username: req.body.username,
      email: req.body.email,
      message: req.body.message,
    });


    const savedMessage = await newMessage.save();


    res.status(201).json({
      message: 'Message saved successfully',
      message: savedMessage,
    });
  } catch (error) {
   
    console.error(error);
    res.status(500).json({ error: 'An error occurred while processing your message.' });
  }
});

router.get('/message', async (req, res) => {
  try {
    const message = await Message.find();
    res.status(200).json(message);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching message details.' });
  }
});

router.delete('/:messageId', async (req, res) => {
  const messageId = req.params.messageId;

  try {
    const deletedMessage = await Message.findByIdAndDelete(messageId);

    if (!deletedMessage) {
      return res.status(404).json({ message: 'Message not found' });
    }

    res.status(200).json({ message: 'Messsage deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while deleting the Messsage.' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const messageId = req.params.id;
    const { username, email, message } = req.body;

    const existingMessage = await Message.findById(messageId);

    if (!existingMessage) {
      return res.status(404).json({ message: 'Message not found' });
    }

    if (username) {
      existingMessage.username = username;
    }
    if (email) {
      existingMessage.email = email;
    }
    if (message) {
      existingMessage.message = message;
    }

    const updatedMessage = await existingMessage.save();

    res.json(updatedMessage);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
