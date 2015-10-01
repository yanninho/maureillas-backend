'use strict';

var userService = require('../../../services/users.service')
  , gcmService = require('../../../services/gcm.service')
  , apnService = require('../../../services/apn.service')
  , messageService = require('../../../services/messages.service')
  , _ = require('underscore')
  , async = require('async')
;

var serviceSend = function(feeds, platformName, service, callback) {
	console.log('##############');
	console.log(platformName);
	console.log('##############');
	userService.findbyPlatformFeedName(platformName, feeds, function(err, users) {	
		if (err) return;
		console.log('nb user : ' + users.length);
		console.log('nb feeds : ' + feeds.length);
		if (!users) return;

		var alreadySendArray = [];

		feeds.forEach(function(feed) {	
			var registration_ids = [];		
			_.filter(users, function(user){
			   var alreadySend = _.contains(alreadySendArray, user._id);
			   var isFeedActive = _.findWhere(user.feeds, { name : feed, suscriber : true }); 
			   if (!alreadySend && isFeedActive !== undefined) {
			   		alreadySendArray.push(user._id);
			   		registration_ids.push(user._id);
			   }			  
			});		
			console.log('nb registered : '  + registration_ids.length);		
			service.sendMessage(registration_ids, '['+ feed +'] Nouvel article disponible!', feed, callback);			
		});
	});	
}
 
exports.sendMessages = function(req, res) {
	var feeds = req.params.FEED.split(',');
    var results = {};
    var errors = [];

    async.parallel([
    		//GOOGLE
    		function(callback) {
			    serviceSend(feeds, 'GOOGLE', gcmService, function(err, result) {
						results['google'] = result || {};						
						if (err) {
							results.google.errors = err;				
						}
						callback();						
				});
    		},
    		//IOS
    		function(callback) {
			    serviceSend(feeds, 'IOS', apnService, function(err, result) {
						results['ios'] = result || {};
						if (err) {
							results.ios.errors = err;				
						}
						callback();						
				});

    		}
    	], 
    	function(err) {
    		console.log('[[[[[[[[[[[[[[[[');
    		console.log(err);
    		console.log(results);
    		console.log(']]]]]]]]]]]]]]]]');
				if (err) {
					return res.json(err);
				}
    			return res.json(results);
    	}
    );
}

exports.sendCustomMessages = function(req, res) {
	var text = req.body.text;
	if (!text) {
		return res.send(400, 'The request must contain a text parameter');
	}
    var results = {};
    var errors = [];

    userService.findActive(function(err, users) {
		if (err) return;
		if (!users) return;

		var registration_ids = [];
		users.forEach(function(user) {
			registration_ids.push(user._id);
		})		

		async.parallel([
				function(callback) {
					gcmService.sendMessage(registration_ids, text, 'main', function(err, result) {
						results['google'] = result;						
						if (err) {
							results.google.errors = err;				
						}
						callback();
					});
				},
				function(callback) {
					apnService.sendMessage(registration_ids, text, 'main', function(err, result) {
						results['ios'] = result;
						if (err) {
							results.ios.errors = err;				
						}
						callback();
					});  
				},
			],			
			function(err) {
				if (err) {
					return res.json(err);
				}
				return res.json(results);
			}
		);  	
  	});

}

exports.scheduleMessages = function(req, res) {
	var feed = req.params.FEED;
	var date = req.params.DATE;
	var regexpDate = new RegExp('[0-9]{4}-[0-9]{2}-[0-9]{2}');
	if (!regexpDate.test(date)) {
		return res.send(400, 'Invalid parameter format, expected YYYY-MM-dd');
	}	
	messageService.create(feed, new Date(date), function(err, createdMessage) {
            if (err) return res.send(500, err.message);
            if (!createdMessage) return res.send(500, 'Error : Unable to schedule message');
            return res.send(200);
	});
}

exports.checkMessages = function(req, res) {
	messageService.findByDate(new Date(), function(err, messages) {
		if (err) res.send(500, err.message);
		if (messages.length > 0) {
			var results = {};
			messages.forEach(function(message){

				async.parallel([
						function(callback) {
						    serviceSend([message.feed],'GOOGLE', gcmService, function(err, result) {
									results['google'] = result;
									if (err) {
										results.google.errors = err;				
									}
									messageService.delete(new Date(), function(err) {
										results.google.errors = err;
										callback();										
									});							
							});	
						},
						function(callback) {
						    serviceSend([message.feed],'IOS', apnService, function(err, result) {
									results['ios'] = result;
									if (err) {
										results.ios.errors = err;				
									}
									messageService.delete(new Date(), function(err) {
										results.ios.errors = err;
										callback();										
									});							
							});	
						}
					],
					function(err) {
						if (err) {
							return res.json(err);
						}
						return res.json(results);
					}
				);

			
			});
		}
		else {
			return res.send(200);
		}		
	})
}