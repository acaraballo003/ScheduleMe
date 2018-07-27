const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Class = require('../models/class');
const auth = require('./helpers/auth');

/* GET new.hbs for a class */
router.get('/new', auth.requireLogin, (req, res, next) => {
  // console.log('\nTrying to render the new page\n');
  res.render('classes/new');
});

/* POST - create a class */
router.post('/', (req, res, next) => {
  const newClass = new Class(req.body);

  newClass.save(function(err, newClass) {
    if (err) console.log(err);

    res.redirect('/home');
  });
});

module.exports = router;
