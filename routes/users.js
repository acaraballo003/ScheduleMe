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
  console.log(req.body);
  const user = new User(req.body);

  user.save(function(err, user) {
    if (err) console.log(err);
    // redirects user back to the welcome page
    res.redirect('../');
  });
});

module.exports = router;
