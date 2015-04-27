'use strict';

var feedService = require('../../../services/feeds.service')
;

exports.getAll = function(req, res) {
	feedService.findAll(function(err, feeds) {
	     try {
	      if (err) return res.send(500, err);
	      if (!feeds) return res.send(404, 'Error : Unable to find feeds');
	      return res.json(feeds);
	    }
	    catch(err) {
	      return res.send(500, err);
	    }   		
	})
}

exports.createFeed = function(req, res) {
    var feedName = req.params.FEED;
    
    feedService.create(feedName, function (err, createdFeed) {
         try {
            if (err) return res.send(500, err);
            if (!createdFeed) return res.send(500, 'Error : Unable to create feed');
            return res.json(createdFeed);
         }
         catch(err) {
            return res.send(500, err);
         }
    });
}

exports.deleteFeed = function(req, res) {
   var feedName = req.params.FEED;
   try {
     feedService.delete(feedName, function(err) {
        if (err) return res.send(500, err);
        return res.send(200);
     });
   }
   catch(err) {
      return res.send(500, err);
   }
}