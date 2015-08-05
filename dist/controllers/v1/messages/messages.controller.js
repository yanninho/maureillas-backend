'use strict';

var userService = require('../../../services/users.service')
  , gcmService = require('../../../services/gcm.service')
  , messageService = require('../../../services/messages.service')
  , _ = require('underscore')
;

var googleSend = function(feeds, callback) {
	userService.findbyPlatformFeedName('GOOGLE', feeds, function(err, users) {	
		if (err) return;
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
			gcmService.sendMessage(registration_ids, 'Nouvel article disponible!', feed, callback);			
		});
	});	
}
 
exports.sendMessages = function(req, res) {
	var feeds = req.params.FEED.split(',');
    var results = {};
    var nbIos = 0;
    var errors = [];

    googleSend(feeds, function(err, result) {
			var results = {
				google : result || {}
			}
			if (err) {
				results.google.errors = err;				
			}
			return res.json(results);
	});
}

exports.sendCustomMessages = function(req, res) {
	var text = req.body.text;
	if (!text) {
		return res.send(400, 'The request must contain a text parameter');
	}
    var results = {};
    var nbIos = 0;
    var errors = [];

    userService.findActive(function(err, users) {
		if (err) return;
		if (!users) return;

		var registration_ids = [];
		users.forEach(function(user) {
			registration_ids.push(user._id);
		})		
		gcmService.sendMessage(registration_ids, text, 'main', function(err, result) {
			var results = {
				google : result
			}
			if (err) {
				results.google.errors = err;				
			}
			return res.json(results);
		});    	
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
			messages.forEach(function(message){
			    googleSend([message.feed], function(err, result) {
						var results = {
							google : result
						}
						if (err) {
							results.google.errors = err;				
						}
						messageService.delete(new Date(), function(err) {
							if (err) return res.send(500, err.message);
							return res.json(results);
						});							
				});				
			})
		}
		else {
			return res.send(200);
		}		
	})
}