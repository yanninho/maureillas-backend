'use strict';

var userService = require('../../../services/users.service');

exports.createUser = function(req, res) {
    var id = req.params.ID;
    var platform = req.params.PLATFORM;
    
    userService.findById(id, function(err, user) {
      console.log('1');
      if (err) return res.send(500, err.message);
      console.log('2');
      if (user) return res.json(user);
      console.log('3');
        userService.create(id, platform, function (err, createdUser) {
             try {
                if (err) return res.send(500, err.message);
                console.log('4');
                if (!createdUser) return res.send(500, 'Error : Unable to create user');
                console.log('5');               
                return res.json(createdUser);
             }
             catch(err) {
                console.log('6');
                return res.send(500, err.message);
             }
        });      
    })
};

exports.getAll = function(req, res) {
  userService.findAll(function(err,users) {
     try {
      if (err) return res.send(500, err.message);
      if (!users) return res.send(404, 'Error : Unable to find users');
      return res.json(users);
    }
    catch(err) {
      return res.send(500, err.message);
    }      
  });
};

// exports.deleteUser = function(req, res) {
    
// };

exports.updateUser = function(req, res) {
   var id = req.params.ID;
   var feeds = req.body.feeds;
   if (!feeds) return res.send(400, 'Invalid request, missing POST parameter feeds');
   if (!Array.isArray(feeds)) res.send(400, 'Invalid request, POST parameter feeds must be an array');
   feeds.forEach(function(feed) {
      if(!feed.hasOwnProperty('name')){
        res.send(400, 'Invalid request, every feed must contain name attribute');
      }
      if(!feed.hasOwnProperty('suscriber')){
        res.send(400, 'Invalid request, every feed must contain suscriber attribute: ' + feed.name);
      }
   });

   try {
     userService.updateFeeds(id, feeds, function(err, result) {
        if (err) return res.send(500, err.message);
        return res.send(200);
     });
   }
   catch(err) {
      return res.send(500, err.message);
   }
};

exports.getUser = function(req, res) {
  var id = req.params.ID;
  userService.findById(id, function(err,user) {
     try {
      if (err) return res.send(500, err.message);
      if (!user) return res.send(404, 'Error : Unable to find the user');
      return res.json(user);
    }
    catch(err) {
      return res.send(500, err.message);
    }      
  });  
}

exports.deleteUser = function(req, res) {
   var id = req.params.ID;
   try {
     userService.delete(id, function(err) {
        if (err) return res.send(500, err.message);
        return res.send(200);
     });
   }
   catch(err) {
      return res.send(500, err.message);
   }
};