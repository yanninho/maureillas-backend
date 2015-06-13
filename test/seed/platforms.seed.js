'use strict';

var requireHelper = require('../require_helper')
  , platformsModel = requireHelper('models/platforms');

exports.seed = function() {
	return platformsModel.create(
	{
		name : 'IOS'
	},			       
	{
		name : 'GOOGLE'
	})                		
}
