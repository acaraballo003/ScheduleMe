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
  res.locals.layout = 'userLayout.hbs';

  next();
});

/* GET the home page */
router.get('/', auth.requireLogin, (req, res, next) => {
  // res.render('home/home');
  // Class.find({}, 'title', function(err, classes) {
  //   if (err) console.error(err);
  //
  //   res.render('home/home', { classes });
  // });
  // User.findById(req.session.userId).then(user =>{
  //   // this enables the hbs file to iterate through the user's classes
  //   var userClasses = [];
  //   for(var i = 0; i < user.classes.length; i+=1){
  //     Class.findById(user.classes[i]).then(data => {
  //       // console.log(data);
  //       userClasses.unshift(data);
  //     }, err =>{
  //       console.error(err);
  //     });
  //   }
  //   console.log(req.session.classes);
  //   res.render('home/home', { userClasses });
  // }, err =>{
  //   console.error(err);
  // });

    var userClasses = [];
    for(var i = 0; i < req.session.classes.length; i+=1){
      Class.findById(req.session.classes[i]).then(data => {
        // console.log(data);
        userClasses.unshift(data);
      }, err =>{
        console.error(err);
      });
    }
    console.log(userClasses);
    res.render('home/home', { userClasses });

});

module.exports = router;
