const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Class = require('../models/class');
const home = require('./home');
const auth = require('./helpers/auth');

router.post('/', (req, res, next) => {
  // first, find the user by Id
  User.findByIdAndUpdate(req.session.userId).then(user => {
    // iterate through their classes
    const arrayOfClassesToDelete = [];
    for( let i = 0; i < user.classes.length; i+=1 ) {
      arrayOfClassesToDelete.push(Class.findById(user.classes[i]));
      // pop the classes from the user's array
      let testPop = user.classes.pop();
      console.log(testPop);
      console.log(` \n${user.classes}\n`);
      // // delete that class from the database
      // Class.findById(user.classes[i]).then(userClass => {
      //   // loop through classes
      //   // delete each class
      // }).catch( err => {
      //   console.error(err);
      // });
    }
    Promise.all(arrayOfClassesToDelete).then((deleteThese)=>{
      console.log(deleteThese);
      res.redirect('/home');
    }).catch((err)=>{
      console.log(err.message);
    });
  }).catch(err => {});
});

module.exports = router;
