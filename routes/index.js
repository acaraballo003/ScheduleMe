const express = require('express');
const router = express.Router();
const User = require('../models/user');
const auth = require('./helpers/auth');


/* GET Welcome page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Schedule-Me' });
});

/* GET about page */
router.get('/about', (req, res, next) => {
  res.render('about', { title: 'Schedule-Me', currentUserId: req.session.currentUserId });
});


/* POST login */
router.post('/login', (req, res, next) => {
  User.authenticate(req.body.username, req.body.password, (err, user) =>{
    if (err || !user) {
      const nextError = new Error('Username or Password incorrect');
      nextError.status = 401;

      return next(nextError);
    }

    req.session.currentUserId = user._id;
    req.session.userN = user.username;
    req.session.classes = user.classes;

    return res.redirect('/home');
  });
});

/* GET logout */
router.get('/logout', auth.requireLogin, (req, res, next) => {
  if (req.session) {
    req.session.destroy((err) => {
      if (err) return next(err);
      return next();
    });
  }

  res.redirect('/');
});


module.exports = router;
