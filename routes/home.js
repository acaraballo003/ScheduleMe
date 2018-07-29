/*
* This file handles the routes after a user logs in
*/

const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Class = require('../models/class');
const auth = require('./helpers/auth');

// middleware function that sets up layout variables requiring user id
router.use((req, res, next) => {
  res.locals.currentUserId = req.session.userId;
  res.locals.userName = req.session.userN;
  res.locals.cList = req.session.classes;
  res.locals.title = 'Schedule-Me';
  res.locals.layout = 'userLayout.hbs';

  next();
});

/* GET the home page */
router.get('/', auth.requireLogin, (req, res, next) => {
  // const currentUserId = req.session.userId;
  // res.render('home/home');
  Class.find({}, 'title', function(err, classes) {
    if (err) console.error(err);

    res.render('home/home', { classes });
  });
});


// router.get('/', (req, res, next) => {
//   console.log('\nTrying to render the home page\n');
//   res.render('home/home');
// });

module.exports = router;
