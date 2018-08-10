/*
* Handles the creation of new users
*/
const express = require('express');
const router = express.Router();
const User = require('../models/user');

// New User
router.get('/new', (req, res, next) => {
  res.render('users/new');
});

// create a User
router.post('/', (req, res, next) => {
  const user = new User(req.body);

  user.save(function(err, user) {
    if (err) console.err(err);
    // redirects user back to the login page
    res.redirect('/');
  });
});

module.exports = router;
