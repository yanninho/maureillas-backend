'use strict';

var feedModel = require('../models/feeds')
;

exports.create = function (feedName, callback) {
  if (!feedName) {
    callback('Invalide parameter');
  }	
  var newFeed = {
  	"name" : feedName
  }
  feedModel.create(newFeed, callback);
}

exports.delete = function (feedName, callback) {
  feedModel.find({
  	"name" : feedName
  },
  function(err, feed) {
    if (err || !feed) callback('Feed not found');
    feedModel.remove(feed, callback);
  })
}

exports.findAll = function(callback) {
  feedModel.find(callback);
}