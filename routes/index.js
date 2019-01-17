let express = require('express');
let router = express.Router();
let passport = require('passport');
let user = require('../models/user');

router.get('/', function(req, res) {
  res.render('landing');
});

//Auth Routes
//Show register form
router.get('/register', function(req, res) {
  res.render('register');
});
//Signup
router.post('/register', function(req, res) {
  let newUser = new user({ username: req.body.username });
  user.register(newUser, req.body.password, function(err, user) {
    if (err) {
      console.log(err);
      return res.render('register');
    }
    passport.authenticate('local')(req, res, function() {
      res.redirect('/campgrounds');
    });
  });
});

//Login Routes
//Login form
router.get('/login', function(req, res) {
  res.render('login');
});
//login logic
router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/campgrounds',
    failureRedirect: '/login'
  }),
  function(req, res) {}
);

//Logout logic
router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/campgrounds');
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}

module.exports = router;