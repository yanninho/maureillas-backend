'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var feedSchema = new Schema({
	name : String
});

// Export the User model
var collectionName = 'feeds';
module.exports = mongoose.model('Feed', feedSchema, collectionName);