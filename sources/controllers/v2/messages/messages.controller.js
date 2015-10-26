'use strict';

var userService = require('../../../services/users.service'),
  gcmService = require('../../../services/gcm.service'),
  apnService = require('../../../services/apn.service'),
  messageService = require('../../../services/messages.service'),
  _ = require('underscore'),
  async = require('async'),
  util = require('util');

var platforms = [{
	name: 'GOOGLE',
	service: gcmService
},{
	name: 'IOS',
	service: apnService
}];

exports.sendMessages = function(req, res) {
	// 1- getFeeds
	// var feed = req.params.FEED;
	var feeds = req.body.categories;
	if (!feeds) {
		return res.send(400, 'The request must contain the parameter "categories"');
	}
	if (!util.isArray(feeds)) {
		return res.send(400, 'The "categories" parameter must be an array with almost an item');
	} 
	if (feeds.length === 0) {
		return res.send(400, 'The "categories" parameter must contain almost an item');
	} 

	// 2- for each Platforms (parallel)
	async.each(platforms, function(platform, callback){
		async.waterfall([ // process for each platform
			//3- getUsers
			function(callback) {
				userService.findbyPlatformFeedName(platform.name, feeds, function(err, users) {
					if (err) return callback(err, null);
					if (users.length === 0) return callback('no users for ' + platform.name, null);
					callback(null, users);
				});
			}, 
			//4- determine users by feed
			function(users, callback) {
				var alreadySendArray = [];
				var feedsUsers = [];
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
					if (registration_ids.length > 0) {
						feedsUsers.push({
							'feed' : feed,
							'usersId' : registration_ids
						});
						callback(null, feedsUsers);							
					}					
				});
			},
			//5- send message in paralell for each feed
			function(feedsUsers, callback) {
				async.each(feedsUsers, function(feedUser, callback) {
						var message = '['+ feedUser.feed +'] Nouvel article disponible!';
						platform.service.sendMessage(feedUser.usersId, message, feedUser.feed, callback);
				});
			}
			], 
			// end process each platform
			callback);
	}, 
	//end all platform
	function(err, results) {
		var result = {
			errors : err, 
			success: results
		}
    	return res.json(result);
	});
};

exports.sendCustomMessages = function(req, res) {
	var text = req.body.text;
	if (!text) {
		return res.send(400, 'The request must contain a text parameter');
	}    
	// process serie
	async.waterfall([
		//1- find users
		function(callback) {
			userService.findActive(function(err, users) {
				if (err) return callback(err, null);
				if (users.length === 0) return callback('no users to send ', null);				
				callback(null, users);
			});			
		},
		// 2- send message (each platform in paralell) 
		function(users, callback) {
			var registration_ids = [];
			users.forEach(function(user) {
				registration_ids.push(user._id);
			});			
			async.each(platforms, function(platform, callback){
				platform.service.sendMessage(registration_ids, text, 'main', callback);
			}, callback);
		}
	], 
	//end process
	function(err, results) {
		var result = {
			errors : err, 
			success: results
		}
    	return res.json(result);
	});
};

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
};

exports.checkMessages = function(req, res) {
	// process serie
	async.waterfall([
		//get messages
		function(callback) {
			messageService.findByDate(new Date(), callback);
		},
		function(messages, callback) {
			if (messages === 0) {
				return callback(null, 'no message to send');
			}
			// all messages paralell
			async.each(messages, function(message, callback) {
				async.waterfall([
					function(callback) {
						// all platform
						async.each(platforms, function(platform, callback) {
								async.waterfall([ // process platform
									//4- getUsers
									function(callback) {
										userService.findbyPlatformFeedName(platform.name, [message.feed], callback);
									}, 
									//5- sendMessage
									function(users, callback) {
										var registration_ids = [];
										users.forEach(function(user) {
											registration_ids.push(user._id);
										});											
										var messageSend = '['+ message.feed +'] Nouvel article disponible!';
										platform.service.sendMessage(registration_ids, messageSend, message.feed, callback);
									}],callback);
						}, callback);	
					},
					function(callback) {
						//delete message
						messageService.delete(new Date(), message.feed, callback);																	
					}
				], callback);			
			},callback);

		}
	], 
	// end process
	function(err, result) {
		if (err) {
			return res.json(err);
		}
		return res.json(result);
	});
}