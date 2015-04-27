'use strict';

var feedModel = require('./feeds');

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
