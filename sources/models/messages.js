'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var messageSchema = new Schema({
	feed : String,
	date : { type: Date }
});

// Export the Platform model
var collectionName = 'messages';
module.exports = mongoose.model('Message', messageSchema, collectionName);