'use strict';

var feedModel = require('../models/feeds')
;

exports.create = function (feedName, callback) {
  if (!feedName) {
    throw new Error('Invalide parameter');
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
    if (err || !feed) throw new Error('Feed not found');
    feedModel.remove(feed, callback);
  })
}

exports.findAll = function(callback) {
  feedModel.find(callback);
}