var express = require('express');
var router = express.Router();

/* GET user info. */
router.get('/', function(req, res, next) {
  res.jsonp({
  	code: 200,
  	msg: {
  		id: 1,
  		name: 'weiwei'
  	}
  });
});

module.exports = router;
