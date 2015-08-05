'use strict';

var feedService = require('../../../services/feeds.service'),
    userService = require('../../../services/users.service')
;

exports.getAll = function(req, res) {
	feedService.findAll(function(err, feeds) {
	      if (err) return res.send(500, err.message);
	      if (!feeds) return res.send(404, 'Error : Unable to find feeds');
        var feedsReturn = [];
        feeds.forEach(function(feed) {
          feedsReturn.push({
            name : feed.name
          });
        });
        return res.json(feedsReturn);  		
	})
}

exports.createFeed = function(req, res) {
    var feedName = req.params.FEED;
    
    feedService.create(feedName, function (err, createdFeed) {
            if (err) return res.send(500, err.message);
            if (!createdFeed) return res.send(500, 'Error : Unable to create feed');
            userService.addFeed(createdFeed, function(err) {
              console.log(err);
            });
            return res.json(createdFeed);
    });
}

exports.deleteFeed = function(req, res) {
   var feedName = req.params.FEED;
     feedService.delete(feedName, function(err) {
        if (err) return res.send(500, err.message);
        return res.send(200);
     });
}