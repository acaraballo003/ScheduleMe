/*
* This file handles the routes after a user logs in
*/

const express = require('express');
const router = express.Router();
const User = require('../models/user');
// const auth = require('./helpers/auth');

// middleware function that sets up layout variables requiring user id
router.use((req, res, next) =>{
  // { layout: 'userLayout.hbs' }
  res.locals.title = 'Schedule-Me';
});

/* GET the home page */
// router.get('/', auth.requireLogin, (req, res, next) => {
//   res.render('home/home');
// });

router.get('/', (req, res, next) => {
  res.render('home/home');
});

module.exports = router;
