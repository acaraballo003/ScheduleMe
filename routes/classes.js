/*
* This file handles the creation of classes
*/
const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Class = require('../models/class');
const home = require('./home');
const auth = require('./helpers/auth');

/* Brings over local variables that were used in home router */
router.use((req, res, next) => {
  res.locals.layout = 'userLayout.hbs';

  next();
});

/* GET new.hbs for a class */
router.get('/new', auth.requireLogin, (req, res, next) => {
  res.render('classes/new');
});

/* POST - create a class */
router.post('/', (req, res, next) => {
  // find the user in the database
  User.findById(req.session.userId).then(user => {
    // create the new class
    let newClass = new Class(req.body);
    // add the new class to the user's class list
    user.classes.unshift(newClass);
    // console.log(user.classes);
    // save the user to the database (**** this is causing login errors)
    user.save(function(err, user){
      if (err) console.error(err);

      newClass.save(function(err, newClass) {
        if (err) console.error(err);

        res.redirect('/home');
      });
    });
    // save the class to the database
    // redirect to the homepage
  }, err => {
    console.error(err);
  });
  // let newClass = new Class(req.body);
  // console.log(newClass);
  // res.locals.cList.unshift(newClass);
  // console.log('\n\n');
  // // console.log(res.locals.cList);
  // newClass.save(function(err, newClass) {
  //   if (err) console.log(err);
  //
  //   res.redirect('/home');
  // });
});

module.exports = router;
