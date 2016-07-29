var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	res.redirect('/debug.index.html');
  //res.render('debug.index.html', { title: 'Express' });
});
router.get('/favicon.ico', function(req, res, next) {
  res.send({});
});


module.exports = router;
