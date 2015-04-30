'use strict';

var platformsModel = require('./platforms');

exports.seed = function() {
	return platformsModel.create(
	{
		name : 'IOS'
	},			       
	{
		name : 'GOOGLE'
	})                		
}
