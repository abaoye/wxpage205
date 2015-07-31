var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var example = require('./routes/example');

var loadYixinUser = require('./routes/yixin/LoadUserInfo'),
	addYixinUser = require('./routes/yixin/AddUserInfo');

var appPangxianlv = require('./routes/pangxianlv/AppWX')

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(session({
	secret: '12345',
	name: 'testapp',
	cookie: {maxAge: 80000 },
	resave: false,
	saveUninitialized: true,
}));

app.use(function(req, res, next){
	if(!req.session.wxopenid){
		req.session.wxopenid = "bao";
		console.log("openid is null")
		return;
	}
  	next();
});

app.use('/pangxianlv/appwx', appPangxianlv)

app.use('/', routes);
app.use('/example', example);

app.use('/yixin/loaduser', loadYixinUser);
app.use('/yixin/adduser', addYixinUser);


module.exports = app;
