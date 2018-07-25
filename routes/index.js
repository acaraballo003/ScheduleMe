const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Schedule-Me' });
});

/* GET login page */
router.get('/login', (req, res, next) => {
  res.render('login');
});


module.exports = router;
