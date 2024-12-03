const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

// MongoDB URI and Options
const uri = "mongodb+srv://jef26:Siaquiz@quiz.7ppwj.mongodb.net/?retryWrites=true&w=majority&appName=QUIZ";
const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

// MongoDB Connection Test Route
router.get('/', async (req, res) => {
  let connectionStatus = 'Not connected to MongoDB';

  try {
    // Test the MongoDB connection
    await mongoose.connect(uri, clientOptions);
    await mongoose.connection.db.admin().command({ ping: 1 });
    connectionStatus = 'Successfully connected to MongoDB!';
  } catch (error) {
    connectionStatus = `Failed to connect to MongoDB: ${error.message}`;
  } finally {
    // Disconnect after the test
    await mongoose.disconnect();
    res.render('testmongo', { connectionStatus });
  }
});

module.exports = router;
