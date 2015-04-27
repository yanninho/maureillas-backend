'use strict';

var platformService = require('../../../services/platforms.service')
;

exports.getAll = function(req, res) {
	platformService.findAll(function(err, platforms) {
	     try {
	      if (err) return res.send(500, err);
	      if (!platforms) return res.send(404, 'Error : Unable to find platforms');
	      return res.json(platforms);
	    }
	    catch(err) {
	      return res.send(500, err);
	    }   		
	})
}

exports.createPlatform = function(req, res) {
    var platformName = req.params.PLATFORM;
    
    platformService.create(platformName, function (err, createdPlatform) {
         try {
            if (err) return res.send(500, err);
            if (!createdPlatform) return res.send(500, 'Error : Unable to create platform');
            return res.json(createdPlatform);
         }
         catch(err) {
            return res.send(500, err);
         }
    });
}

exports.deletePlatform = function(req, res) {
   var platformName = req.params.PLATFORM;
   try {
     platformService.delete(platformName, function(err) {
        if (err) return res.send(500, err);
        return res.send(200);
     });
   }
   catch(err) {
      return res.send(500, err);
   }
}