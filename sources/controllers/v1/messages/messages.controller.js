'use strict';

var userService = require('../../../services/users.service'),
  gcmService = require('../../../services/gcm.service'),
  apnService = require('../../../services/apn.service'),
  messageService = require('../../../services/messages.service'),
  _ = require('underscore'),
  async = require('async');

var platforms = [{
	name: 'GOOGLE',
	service: gcmService
},{
	name: 'IOS',
	service: apnService
}];

exports.sendMessages = function(req, res) {
	// 1- getFeed
	var feed = req.params.FEED;
	// 2- getMessage
	var message = '['+ feed +'] Nouvel article disponible!';
	// 3- for each Platforms (parallel)
	async.each(platforms, function(platform, callback){
		async.waterfall([ // process for each platform
			//4- getUsers
			function(callback) {
				userService.findbyPlatformFeedName(platform.name, [feed], function(err, users) {
					if (err) return callback(err, null);
					if (users.length === 0) return callback('no users for ' + platform.name, null);
					callback(null, users);
				});
			}, 
			//5- sendMessage
			function(users, callback) {
				platform.service.sendMessage(users, message, feed, callback);
			}], callback);
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
				var registration_ids = [];
				users.forEach(function(user) {
					registration_ids.push(user._id);
				});				
				callback(null, registration_ids);
			});			
		},
		// 2- send message (each platform in paralell) 
		function(registration_ids, callback) {
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
										var messageSend = '['+ message.feed +'] Nouvel article disponible!';
										platform.service.sendMessage(users, messageSend, message.feed, callback);
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