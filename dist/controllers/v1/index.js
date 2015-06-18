'use strict';

var express = require('express')
	, router = express.Router()
	, config = require('../../config/environment');

	router.use(function(req, res, next){
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

router.use('/users', require('./users'));
router.use('/messages', require('./messages'));
router.use('/feeds', require('./feeds'));
router.use('/platforms', require('./platforms'));

module.exports = router;