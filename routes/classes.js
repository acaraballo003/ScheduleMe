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
router.use(home);

/* GET new.hbs for a class */
router.get('/new', auth.requireLogin, (req, res, next) => {
  res.render('classes/new');
});

/* POST - create a class */
router.post('/', (req, res, next) => {
  // find the user in the database
  User.findById(req.session.userId).populate('classes').then(user => {
    // create the new class
    let newClass = new Class(req.body);
    // check for conflicts here before saving the class
    conflictCheck(newClass, user.classes).then(myResponse => {
      console.log(myResponse);
      user.classes.unshift(newClass);
      // save the user to the database
      user.save(function(err, user){
        if (err) console.error(err);

        // save the class to the database
        // redirect to the homepage
        newClass.save(function(err, newClass) {
          if (err) console.error(err);

          res.redirect('/home');
        });
      });
    }).catch( err => {
      console.log("\noh boy.\n");
      console.error(err);
      res.redirect('/home');
    });
  }).catch( err => {
    console.error(err);
  });

});

function conflictCheck(nClass, classList) {
  return new Promise((resolve, reject) => {
    // iterate through the list of classes
    for( let i = 0; i < classList.length; i+=1 ) {
      // iterate through the new class's days and check if it's in the class
      // we are currently on
      for( let j = 0; j < nClass.days.length; j+=1 ) {
        // if this is false, just keep move to the next day
        if( !classList[i].days.includes(nClass.days[j]) ){
          console.log("all good so far");
        }
        else{
          // check for conflicts in time if classes are on the same day
          if( timeCheck(nClass, classList[i]) == false ) {
            reject();
          }

          console.log("we good");
        }
      }
      console.log("still good");
    }
    // we made it outside of the big for loop
    resolve();
  });
}

function timeCheck(thisClass, myClass) {
  // cast the HH of the new class into a number
  let start = parseInt(thisClass.start_time.split(':')[0], 10);
  let end = parseInt(myClass.end_time.split(':')[0], 10);
  // if the start of the new class is before this class ends then we return false
  if( start < end ) return false;
  // else, let's check the mm
  else {
    let mmStart = parseInt(thisClass.start_time.split(':')[2], 10);
    let mmEnd = parseInt(myClass.end_time.split(':')[2], 10);
    // if mm happens before myClass ends, return false
    if( mmStart < mmEnd ) return false;

    return true;
  }
}

module.exports = router;
