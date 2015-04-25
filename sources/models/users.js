'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var feedSchema = new Schema({
	name : String,
	suscriber : Boolean
});

// define the userSchema
var userSchema = new Schema({
   _id   : String,
   platform  : String,
   active : Boolean,
   feeds : [feedSchema]
});


userSchema.statics.findbyPlatformFeedName = function (platform, feed, callback) {
	return this.model('User').find(
	{
		"platform": platform, 
		"active": true,
		"feeds.name" : feed,
		"feeds.suscriber" : true             
	}
	,callback);        
} 

// Export the User model
var collectionName = 'users';
module.exports = mongoose.model('User', userSchema, collectionName);