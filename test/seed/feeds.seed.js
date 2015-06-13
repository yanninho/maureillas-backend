'use strict';

var requireHelper = require('../require_helper')
  , feedModel = requireHelper('models/feeds');

exports.seed = function() {
	return feedModel.create(
	{
		name : 'agenda'
	},			       
	{
		name : 'animals'
	},			       
	{
		name : 'news'
	})                		
}
