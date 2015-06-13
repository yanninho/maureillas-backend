'use strict';

var userModel = require('../models/users')
  , platformService = require('./platforms.service')
  , feedService = require('./feeds.service')
;

exports.create = function(id, platform, callback) {

  platformService.findByName(platform, function(err, platformResult) {

      if (err) {
        throw new Error(err);
      }
      if (!platformResult) {
        throw new Error('Platform not found');
      }    

      feedService.findAll(function(err, feedsResult) {
        if (err) {
          throw new Error(err);          
        }
        if( !feedsResult || !Array.isArray(feedsResult) ) {
          throw new Error('Error get list feeds');
        }
        var newFeeds = [];
        feedsResult.forEach(function(feed) {
          newFeeds.push({
            name : feed.name,
            suscriber : true
          })
        });        

        var newUser = 
          { 
            _id: id,
            platform : platform,
            active : true,
            feeds : newFeeds 
          };
        userModel.create(newUser, callback);
      })

  })
}

exports.findbyPlatformFeedName = function (platformName, feedName, callback) {
  userModel.find(
  {
    "platform": platformName, 
    "active": true,
    "feeds.name" : feedName,
    "feeds.suscriber" : true             
  }
  ,callback);        
} 

exports.addFeed = function(feed, callback) {
  userModel.find(function(err, userResult) {
    var users = userResult;
    users.forEach(function(user){
        user.feeds.push({
          name : feed.name,
          suscriber : true
        })
        user.save();
    });
  });
  return callback();
}

exports.updateFeeds = function(userId, newFeeds, callback) {
  userModel.findById(userId, function(err, user) {
    if (err || !user) throw new Error('User not found');
    user.feeds = newFeeds;   
    user.save(callback);
  })
}

exports.findAll = function(callback) {
  userModel.find(callback);
}

exports.findActive = function(callback) {
  userModel.find(  {
    "active": true           
  }
  ,callback);
}

exports.findById = function(id, callback) {
  userModel.findById(id, callback);
}

exports.delete = function(userId, callback) {
  userModel.findById(userId, function(err, user) {
    if (err || !user) throw new Error('User not found');
    userModel.remove(user, callback);
  })  
}