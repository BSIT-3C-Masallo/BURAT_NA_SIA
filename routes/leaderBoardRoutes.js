var express = require('express');
var router = express.Router();
const Quizdata = require('../schema/Quizdata'); // Import Quizdata model

// GET leaderboard page
router.get('/', async function (req, res, next) {
  try {
    // Fetch the leaderboard data from MongoDB, sorted by Points in descending order
    const leaderboardData = await Quizdata.find().sort({ Points: -1 }).limit(10); // Get top 10 results

    // Render the leaderboard view and pass the data
    res.render('leaderBoard', { leaderboardData });
  } catch (error) {
    console.error('Error fetching leaderboard data:', error);
    res.status(500).send('Error fetching leaderboard');
  }
});

module.exports = router;
