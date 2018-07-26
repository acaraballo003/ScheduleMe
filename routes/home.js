/*
* This file handles the routes after a user logs in
*/

const express = require('express');
const router = express.Router();
const User = require('../models/user');

/* GET the home page */
router.get('/', (req, res, next) => {
  res.render('home/home');
});

module.exports = router;
