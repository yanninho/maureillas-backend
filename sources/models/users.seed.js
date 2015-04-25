'use strict';

var User = require('./users');

exports.seed = function(callback) {
	return User.create(
	{
		_id   : 'Azsqer54Y',
		platform  : 'IOS',
		active : true,
		feeds : [
		{
			name : 'feed fake',
			suscriber : true
		}
		]
	}			       
	, callback)                		
}
