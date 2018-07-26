/*
* This file handles the routes after a user logs in
*/

const express = require('express');
const router = express.Router();
const User = require('../models/user');
const auth = require('./helpers/auth');

// middleware function that sets up layout variables requiring user id
// router.use((req, res, next) =>{
//   // { layout: 'userLayout.hbs' }
//   res.locals.title = 'Schedule-Me';
// });

router.use((req, res, next) => {
  res.locals.currentUserId = req.session.userId;
  res.locals.userName = req.session.userN;

  next();
});

/* GET the home page */
router.get('/', auth.requireLogin, (req, res, next) => {
  console.log('\nTrying to render the home page\n');
  // const currentUserId = req.session.userId;
  res.render('home/home');
});

// router.get('/', (req, res, next) => {
//   console.log('\nTrying to render the home page\n');
//   res.render('home/home');
// });

module.exports = router;
