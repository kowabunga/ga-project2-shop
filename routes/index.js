const router = require('express').Router();
const passport = require('passport');
const Product = require('../models/product');

// The root route renders our only view
router.get('/', async function (req, res) {
  // Get a random product when you load the page each time for the "You may like..." section
  const randomProduct = await Product.aggregate([{ $sample: { size: 1 } }]);
  res.render('index', { randomProduct: randomProduct[0] });
});

router.get('/login', function (req, res) {
  res.render('login');
});

// Google OAuth login route
router.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

// Google OAuth callback route
router.get(
  '/oauth2callback',
  passport.authenticate('google', {
    successRedirect: '/user', // UPDATE THIS, where do you want the client to go after you login
    failureRedirect: '/login', //  UPDATE THIS, where do you want the client to go if login fails
  })
);

// OAuth logout route
router.get('/logout', function (req, res) {
  req.logout(function () {
    //< - req.logout comes from passport, and what it does is destorys the cookie keeping track of the user!
    res.redirect('/'); // <---- UPDATE THIS TO WHERE YOU WANT THE USER TO GO AFTER LOGOUT
  });
});

module.exports = router;
