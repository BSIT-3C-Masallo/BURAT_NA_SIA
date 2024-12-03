var express = require('express');
var router = express.Router();
var Userinfo = require('../schema/Userinfo'); // Import the correct model, Userinfo

// Render the registration page
router.get('/', function (req, res, next) {
  res.render('register', { title: 'Register Page', errorMessage: null });
});

// Handle form submissions
router.post('/', async (req, res) => {
  console.log(req.body); // Log the form data

  const { password, confirmPassword, fullname,email,username } = req.body;

  if(password!==confirmPassword) {
    return res.status(400).render('register', { 
      title: 'Register Page', 
      errorMessage: 'Confirmation password does not match with your password.' 
    });
  }

  try {
    const user = new Userinfo({fullname,email,username,password});
    await user.save();
    res.redirect('/login');
  } catch (err) {
    res.status(400).render('register', { 
      title: 'Register Page', 
      errorMessage: 'Error creating user. Please try again.' 
    });
  }
});

module.exports = router;
