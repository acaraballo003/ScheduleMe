const express = require('express');
const router = express.Router();
const User = require('../models/user');

/* GET users listing. */
router.get('/', (req, res, next) => {
  User.find({}, 'username', function(err, users) {
    if(err) console.error(err);

    res.render('users/index', { users });
  });
});

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
    res.redirect('../login');
  });
});

module.exports = router;
