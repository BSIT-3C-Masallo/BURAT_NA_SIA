const mongoose = require('mongoose');

// Define a Mongoose Schema for Quizdata
const quizdataSchema = new mongoose.Schema({
    Position: { type: Number, required: true },
    Username:{type:String, required:true},
    Date_Finished: { type: Date, required: true, default: Date.now },   
    Points: { type: Number, required: true },
    Results: { type: Number, required: true }
});

// Create a Mongoose model for Quizdata
const Quizdata = mongoose.model('Quizdata', quizdataSchema);

// Export the model
module.exports = Quizdata;