'use strict';

var userService = require('../../../services/users.service')
  , gcmService = require('../../../services/gcm.service')
  , messageService = require('../../../services/messages.service')
;

var googleSend = function(feed, callback) {
	userService.findbyPlatformFeedName('GOOGLE', feed, function(err, users) {	
		if (err) return;
		if (!users) return;

		var registration_ids = [];
		users.forEach(function(user) {
			registration_ids.push(user._id);
		})		
		gcmService.sendMessage(registration_ids, 'New article on ' + feed, callback);
	});	
}
 
exports.sendMessages = function(req, res) {
	var feed = req.params.FEED;
    var results = {};
    var nbIos = 0;
    var errors = [];

    googleSend(feed, function(err, result) {
			var results = {
				google : result
			}
			if (err) {
				results.google.errors = err;				
			}
			return res.json(results);
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
         try {
            if (err) return res.send(500, err.message);
            if (!createdMessage) return res.send(500, 'Error : Unable to schedule message');
            return res.send(200);
         }
         catch(err) {
            return res.send(500, err.message);
         }
	});
}

exports.checkMessages = function(req, res) {
	messageService.findByDate(new Date(), function(err, messages) {
		if (err) res.send(500, err.message);
		if (messages.length > 0) {
			messages.forEach(function(message){
			    googleSend(message.feed, function(err, result) {
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