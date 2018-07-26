const express = require('express');
const router = express.Router();
const User = require('../models/user');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Schedule-Me' });
});

/* GET login page */
router.get('/login', (req, res, next) => {
  res.render('login');
});

/* POST login */
router.post('/login', (req, res, next) => {
  User.authenticate(req.body.username, req.body.password, (err, user) =>{
    if (err || !user) {
      const nextError = new Error('Username or Password incorrect');
      nextError.status = 401;

      return next(nextError);
    }

    req.session.userID = user._id;

    return res.redirect('/home');
  });
});

router.get('/home', (req, res, next) => {
  res.render('home/home');
});

module.exports = router;
