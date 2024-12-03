var express = require('express');
var router = express.Router();
const ensureAuthenticated = require('../middlewares/authenticator'); // Import the middleware

/* GET home page. */
// Use ensureAuthenticated middleware to protect this route
router.get('/', ensureAuthenticated, function (req, res, next) {
  res.render('index', { title: 'Welcome Page', user: req.session.user });
});

module.exports = router;
