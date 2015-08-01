var express = require('express');
var router = express.Router();

/* get app id. */
router.get('/', function(req, res, next) {
	var key = req.body['key'];
	var prj_name = req.body['prj'];
	switch(key){
		case 'appid':
			getAppId(req, res);
		    break;
		case 'openid':
			getOpenId(req, res);
		    break;
		}
	}
    
});

function getAppId(req,res){
	//read json
	res.jsonp({
		code: 200,
		appid: 'NX2345666'
	});
}

function getOpenId(req,res){

	var code = req.body['code'];
	
	res.jsonp({
		code: 200,
		openid: 'NX2345666'
	});
}

module.exports = router;
