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

  next();
});

/* GET the home page */
router.get('/', auth.requireLogin, (req, res, next) => {
  // populates the homepage with the user's classes
  User.findById(req.session.userId).populate('classes').exec((err, user) => {
    res.render('home/home', { user: user, classes: user.classes});
  });

});

router.delete('/', auth.requireLogin, (req, res, next) => {
  User.findByIdAndUpdate(req.session.userId).then((user) =>{
    Class.deleteMany({_id: {$in: user.classes }}).then(() => {
      // db.survey.update({$pull: {classes: {$in: user.classes}}});
      user.classes = [];
      user.save(function(err, user) {
        if (err) console.err(err);
        res.redirect('/home');
      });
    });
  });
  // User.findByIdAndUpdate(req.session.userId, {$set: {classes: []}}).then(() => {});
})
module.exports = router;
