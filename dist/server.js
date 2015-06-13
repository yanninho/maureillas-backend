/**
 * Server configuration
 */

'use strict';

var express = require('express');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');

module.exports = function(app, config) {
		var env = app.get('env');
		app.use(bodyParser.json()); 
		app.use(bodyParser.json({ type: 'application/vnd.api+json' })); 
		app.use(bodyParser.urlencoded({ extended: true })); 
		app.use(methodOverride('X-HTTP-Method-Override')); 	

		app.use(function(req, res, next){
			res.header('Access-Control-Allow-Credentials', true);
			res.header('Access-Control-Allow-Origin', req.headers.origin);
			res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
			res.header('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Cache-Control');
			if (req.method === 'OPTIONS') {
				res.statusCode = 204;
				return res.end();
			}
			// Authorization
		    if (req.headers.authorization && req.headers.authorization.search('Basic ') === 0) {
		        // fetch key
		        if (req.headers.authorization.split(' ')[1] == 'key:'+ config.security) {
		            return next();
		        }
		    }
		    console.log('Unable to authenticate');
		    console.log(req.headers.authorization);
		    res.header('WWW-Authenticate', 'Basic realm="Protected Service"');
		    if (req.headers.authorization) {
		        setTimeout(function () {
		            res.send('Authentication required', 401);
		        }, 5000);
		    } else {
		        res.send('Authentication required', 401);
		    }
		});

		app.listen(config.port, function callback(){
			console.log('Server started on port : ' + config.port);
		});
};