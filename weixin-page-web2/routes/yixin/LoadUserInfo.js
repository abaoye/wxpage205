var express = require('express');
var router = express.Router();
var mysql = require('mysql');

/* GET user info. */
router.get('/', function(req, res, next) {

  var openId = req.query.openid;

  if (!openId) {
    sendResult(undefined, res);
  };

  var conn = mysql.createConnection({
    host: 'localhost',
    user: 'nodejs',
    password: 'nodejs',
    database:'test',
    port: 3306
  });

  conn.connect();
  conn.query('SELECT * FROM YixinUser WHERE OpenID = ' + openId, function(err, rows, fields) {
    if (err) {
    	throw err;
    }
    sendResult(rows[0], res);
  });
  conn.end();
});

function sendResult(result, res) {
	if (!result) {
		res.jsonp({
			code: 403,
			msg: 'user doesnot exist'
		})
		return;
	};
	res.jsonp({
		code: 200,
		msg: result
	})
}


module.exports = router;
