'use strict';

var messagesModel = require('./messages');

exports.seed = function() {
	var datePlusOnyear = new Date();
	datePlusOnyear.setDate(datePlusOnyear.getDate() + 365);
	var now = new Date();

	return messagesModel.create(
	{
		feed : 'other',
		date : now
	},
	{
		feed : 'infos',
		date : datePlusOnyear
	}
	)                		
}
