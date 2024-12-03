var express = require('express');
var router = express.Router();
const ensureAuthenticated = require('../middlewares/authenticator');
/* GET home page. */
router.get('/',ensureAuthenticated, function(req, res, next) {
  res.render('AboutUs', { title: 'Welcome Page', user: req.session.user });
});

module.exports = router;
