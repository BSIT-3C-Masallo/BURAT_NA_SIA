var express = require('express');
var router = express.Router();
const Userinfo = require('../schema/Userinfo'); // Ensure the correct model is imported

// Render login page
router.get('/', function (req, res, next) {
  res.render('login', { title: 'Login Page', errorMessage: null,errorMessage1: null });
});

// Handle login form submission
router.post('/', async (req, res) => {
  console.log(req.body); // Log form data

  const { username, password } = req.body;

  try {
    const user = await Userinfo.findOne({ username });

    if (!user) {
      return res.status(400).render('login', {
        title: 'Login Page',
        errorMessage: 'No matching username found.',
        errorMessage1:null,
      });
    }

    if (user.password !== password) {
      return res.status(400).render('login', {
        title: 'Login Page',
        errorMessage:null,
        errorMessage1: 'Password does not match.',
      });
    }

    // Save user details in session
    req.session.user = {
      id: user._id,
      username: user.username,
    };

    // Redirect to index (or dashboard)
    res.redirect('/index');
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).render('login', {
      title: 'Login Page',
      errorMessage: 'An error occurred. Please try again.',
    });
  }
});

// Logout route
router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Error terminating session', err);
      return res.status(500).send('Error during logout.');
    }
    res.redirect('/login');
  });
});

module.exports = router;
