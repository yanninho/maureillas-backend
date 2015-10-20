'use strict';

var gcm = require('node-gcm'),
  config = require('../config/environment'),
  sender = new gcm.Sender(config.gcm.api_key);

exports.sendMessage = function(registration_ids, message, feed, callback) {

	if (registration_ids === null) {
		callback('the first parameter must contains an array of registration ids', null);
		return;
	}

	if (registration_ids.length === 0) {
		callback('No user to send', null);
		return;
	}

	if (message === null) {
		callback('the second parameter must contains a message to send', null);
		return;
	}

	var configMessage = {
		data : {
			title : 'Ville de Maureillas',
			message : message,
			category : feed
		}
	};

	message = new gcm.Message(configMessage);
	sender.send(message, registration_ids, callback);
};