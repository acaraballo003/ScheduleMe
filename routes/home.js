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
  res.locals.title = 'Schedule-Me';
  res.locals.layout = 'homeLayout.hbs';

  next();
});

/* GET the home page */
router.get('/', auth.requireLogin, (req, res, next) => {
  User.findById(req.session.userId).populate('classes').exec((err, user) => {
    res.render('home/home', { user: user, classes: user.classes})
  });

});

module.exports = router;
