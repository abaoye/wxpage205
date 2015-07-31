var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var crypto = require('crypto');

/* ADD user info. */
router.get('/', function(req, res, next) {


  var openId = req.query.openid,
      name = req.query.name,
      phoneNo = req.query.phoneno,
      gamePoint = req.query.gamepoint,
      smallDistance = req.query.smalldis,
      bigDistance = req.query.bigdis;

  var conn = mysql.createConnection({
    host: 'localhost',
    user: 'nodejs',
    password: 'nodejs',
    database:'test',
    port: 3306
  });
  conn.connect();

  var addUserSql = 'INSERT INTO YixinUser(OpenID, Name, PhoneNo, GamePoint, SmallDistance, BigDistance) VALUES("'
    + openId + '", "' + name + '", "' + phoneNo +  '", "' + gamePoint + '", "' + smallDistance + '", "' + bigDistance + '");';

  conn.query(addUserSql, function(err, rows, fields) {
    if (err) {
      throw err;
    }
    sendResult(res);
  });
  conn.end();
});


function sendResult(res) {
  res.jsonp({
    code: 200,
    msg: 'add success'
  })
}

module.exports = router;
