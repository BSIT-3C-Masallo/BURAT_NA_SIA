const express = require('express');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const session = require('express-session');
const ensureAuthenticated = require('../middlewares/authenticator'); // Import middleware
const router = express.Router();
const Quizdata = require('../schema/Quizdata'); // Import the Quizdata model

// Set up session middleware
router.use(
  session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Set to true if using HTTPS
  })
);

// Helper function to load questions from local JSON file as fallback
function loadQuestionsFromFile() {
  const filePath = path.join(__dirname, 'api.json');
  const jsonData = fs.readFileSync(filePath, 'utf-8');
  const data = JSON.parse(jsonData);
  return data.results.map((question, index) => ({
    id: index + 1,
    question: question.question,
    correct_answer: question.correct_answer,
    answers: [...question.incorrect_answers, question.correct_answer].sort(() => Math.random() - 0.5),
  }));
}

// GET route for displaying all questions on a single page
router.get('/', ensureAuthenticated, async (req, res) => {
  try {
    const response = await axios.get('https://opentdb.com/api.php?amount=10&type=multiple');
    const questions = response.data.results.map((question, index) => ({
      id: index + 1,
      question: question.question,
      correct_answer: question.correct_answer,
      answers: [...question.incorrect_answers, question.correct_answer].sort(() => Math.random() - 0.5),
    }));

    req.session.questions = questions; // Store questions in session
    res.render('quizProtoPage', { questions });
  } catch (error) {
    console.error('Failed to fetch from OpenTDB. Using fallback JSON file.');

    // Load questions from local JSON file as fallback
    const questions = loadQuestionsFromFile();
    req.session.questions = questions; // Store questions in session
    res.render('quizProtoPage', { questions });
  }
});

// POST route to check answers and calculate score
router.post('/submit', ensureAuthenticated, async (req, res) => {
  try {
    const userAnswers = req.body;
    const questions = req.session.questions; // Retrieve questions from session

    if (!questions) {
      return res.status(400).send('Session expired. Please retake the quiz.');
    }

    // Prepare the result data
    let score = 0;
    const results = questions.map((question, index) => {
      const correctAnswer = question.correct_answer;
      const userAnswer = userAnswers[`answer${index + 1}`];
      const isCorrect = userAnswer === correctAnswer;

      if (isCorrect) score++;

      return {
        question: question.question,
        correctAnswer,
        userAnswer: userAnswer || 'No Answer',
        isCorrect,
      };
    });

    const totalQuestions = questions.length;
    const percentage = Math.round((score / totalQuestions) * 100);

    // Get username from the session
    const username = req.session.user.username; // Fetch username from session
    if (!username) {
      return res.status(400).send('User is not authenticated. Please log in again.');
    }

    const userId = req.session.user.id; // Assuming user ID is stored in session

    // Calculate the position dynamically
    const allResults = await Quizdata.find().sort({ Points: -1 }); // Sort by score in descending order
    const position = allResults.findIndex(entry => entry.Username === username) + 1; // Find the position (1-based index)

    // Create a new Quizdata entry to save the result
    const quizData = new Quizdata({
      Position: position,  // Dynamic position
      Username: username,  // Username from session
      Date_Finished: new Date(), // Automatically logs the submission date
      Points: score,
      Results: percentage,
    });

    await quizData.save(); // Save to MongoDB

    // Clear session data if desired
    req.session.questions = null;

    // Render result page with results data
    res.render('quizResult', { score, totalQuestions, percentage, results });
  } catch (error) {
    console.error('Error saving quiz result:', error);
    res.status(500).send('Error calculating score');
  }
});

module.exports = router;
