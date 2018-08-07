const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Class = require('../models/class');
const home = require('./home');
const auth = require('./helpers/auth');

router.use((req, res, next) => {
  res.locals.title = 'Schedule-Me';
  res.locals.layout = 'scheduleLayout.hbs'

  next();
});

router.get('/view', auth.requireLogin, (req, res) => {
  User.findById(req.session.userId).populate('classes').exec((err, user) => {
    res.render('schedule/view', { user, classes: user.classes});
  });
});

module.exports = router;
