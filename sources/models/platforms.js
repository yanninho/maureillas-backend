'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var platformSchema = new Schema({
	name : String
});

// Export the Platform model
var collectionName = 'platforms';
module.exports = mongoose.model('Platform', platformSchema, collectionName);