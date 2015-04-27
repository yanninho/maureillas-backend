'use strict';

var userService = require('../../../services/users.service')
  , gcmService = require('../../../services/gcm.service')
;

exports.sendMessages = function(req, res) {
	var feed = req.params.FEED;
    var results = {};
    var nbIos = 0;
    var errors = [];

	userService.findbyPlatformFeedName('GOOGLE', feed, function(err, users) {
		if (err) return;
		if (!users) return;

		var registration_ids = [];
		users.forEach(function(user) {
			registration_ids.push(user._id);
		})		

		gcmService.sendMessage(registration_ids, 'New article on ' + feed, function(err, result) {
			results.google = result;
			if (err) {
				results.google.errors = err;				
			}
			return res.json(results);
		});
	})

}