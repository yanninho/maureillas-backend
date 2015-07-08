'use strict';

var gcm = require('node-gcm')
  , config = require('../config/environment')
  , sender = new gcm.Sender(config.gcm.api_key);

exports.sendMessage = function(registration_ids, message,callback) {

	if (registration_ids === null) {
		callback('the first parameter must contains an array of registration ids');
	}
	if (registration_ids.length === 0) {
		callback('No user to send');
	};

	if (message === null) {
		callback('the second parameter must contains a message to send');
	}

	var configMessage = {
		data : {
			title : 'Ville de Maureillas',
			message : message
		}
	}

	var message = new gcm.Message(configMessage);
	sender.send(message, registration_ids, callback);
}