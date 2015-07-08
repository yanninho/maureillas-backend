'use strict';

var messageModel = require('../models/messages')
;

var findByDate = function(date, callback) {
	;	
}

exports.findByDate = function(date, callback) {
	  messageModel.find({
	  	date : {$lt: date}
	}, 
	callback);
}

exports.create = function(feed, date, callback) {
  if (!feed || !date) {
    callback('Invalid parameters');
  }
  var newMessage = {
    feed : feed,
    date : date
  }
  messageModel.create(newMessage, callback);	
}

exports.delete = function(date, callback) {
    messageModel.find(
    {
	  	date : {$lt: date}
	})
    .remove(callback);	
}