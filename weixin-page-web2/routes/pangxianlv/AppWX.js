var express = require('express');
var router = express.Router();

/* get app id. */
router.get('/', function(req, res, next) {
    res.jsonp({
        code: 200,
        appid: 'NX2345666'
    });
});


module.exports = router;
