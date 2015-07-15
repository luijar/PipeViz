var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'PipeViz' });
});

/* GET spike page. */
router.get('/spike', function(req, res, next) {
  res.render('spike', { title: 'PipeViz' });
});
module.exports = router;
