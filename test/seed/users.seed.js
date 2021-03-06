'use strict';

var requireHelper = require('../require_helper')
  , userModel = requireHelper('models/users');

exports.seed = function() {
	return userModel.create(
		{
			_id   : 'Azsqer54Y',
			platform  : 'IOS',
			active : true,
			feeds : [
			{
				name : 'feed fake',
				suscriber : true
			},
			{
				name : 'feed fake 2',
				suscriber : false
			}
			]
		},
		{
			_id   : 'T6Y890OK',
			platform  : 'GOOGLE',
			active : true,
			feeds : [
			{
				name : 'feed fake',
				suscriber : false
			},
			{
				name : 'feed fake 2',
				suscriber : false
			}
			]
		},
		{
			_id   : 'APA91bFhAvNWQCNPdVHP6vOyv_IdQ4FBKeYe0VEUeXUeYjFqxwuDLKfWnNWPGVmHvNeW-0HWw68LW0vaO6CATGWkYVwuZgQ58BJGXxG3ikn1TpPNLXw6O2KDygsxbNOYyVelS5aXQB5gfisMa0yNOspSML4xFxupGA',
			platform  : 'GOOGLE',
			active : true,
			feeds : [
			{
				name : 'other',
				suscriber : true
			}
			]
		},
		{
			_id   : 'RDGH78',
			platform  : 'IOS',
			active : true,
			feeds : [
				{
					name : 'feed fake',
					suscriber : false
				},
				{
					name : 'feed fake 2',
					suscriber : true
				}

			]
		}
,
		{
			_id   : 'EEFDCG',
			platform  : 'IOS',
			active : false,
			feeds : []
		}
	)                		
}
