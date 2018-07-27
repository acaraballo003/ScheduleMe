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
  let newClass = new Class(req.body);

  newClass.save(function(err, newClass) {
    if (err) console.log(err);

    res.redirect('/home');
  });
});

module.exports = router;
