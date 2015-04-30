'use strict';

var platformService = require('../../../services/platforms.service')
;

exports.getAll = function(req, res) {
	platformService.findAll(function(err, platforms) {
	     try {
	      if (err) return res.send(500, err.message);
	      if (!platforms) return res.send(404, 'Error : Unable to find platforms');
        var platformsReturn = [];
        platforms.forEach(function(platform) {
          platformsReturn.push({
            name : platform.name
          });
        });
	      return res.json(platformsReturn);
	    }
	    catch(err) {
	      return res.send(500, err.message);
	    }   		
	})
}

exports.createPlatform = function(req, res) {
    var platformName = req.params.PLATFORM;
    
    platformService.create(platformName, function (err, createdPlatform) {
         try {
            if (err) return res.send(500, err.message);
            if (!createdPlatform) return res.send(500, 'Error : Unable to create platform');
            return res.send(200);
         }
         catch(err) {
            return res.send(500, err.message);
         }
    });
}

exports.deletePlatform = function(req, res) {
   var platformName = req.params.PLATFORM;
   try {
     platformService.delete(platformName, function(err) {
        if (err) return res.send(500, err.message);
        return res.send(200);
     });
   }
   catch(err) {
      return res.send(500, err.message);
   }
}