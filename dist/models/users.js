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

// Export the User model
var collectionName = 'users';
module.exports = mongoose.model('User', userSchema, collectionName);