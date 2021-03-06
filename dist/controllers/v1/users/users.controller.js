'use strict';

var userService = require('../../../services/users.service');

exports.createUser = function(req, res) {
    var userReq = req.body.user;
    if (!userReq) return res.send(400, 'Invalid request, missing PUT parameter user');
    if (!userReq.id) return res.send(400, 'Invalid request, missing PUT parameter user ID');
    if (!userReq.platform) return res.send(400, 'Invalid request, missing PUT parameter user PLATFORM');
    
    userService.findById(userReq.id, function(err, user) {
      if (err) return res.send(500, err.message);
      if (user) return res.json(user);
        userService.create(userReq.id, userReq.platform, function (err, createdUser) {
                if (err) return res.send(500, err.message);
                if (!createdUser) return res.send(500, 'Error : Unable to create user');               
                return res.json(createdUser);
        });      
    })
};

exports.getAll = function(req, res) {
  userService.findAll(function(err,users) {
      if (err) return res.send(500, err.message);
      if (!users) return res.send(404, 'Error : Unable to find users');
      return res.json(users);     
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
     userService.updateFeeds(id, feeds, function(err, result) {
        if (err) return res.send(500, err.message);
        return res.send(200);
     });
};

exports.getUser = function(req, res) {
  var id = req.params.ID;
  userService.findById(id, function(err,user) {
      if (err) return res.send(500, err.message);
      if (!user) return res.send(404, 'Error : Unable to find the user');
      return res.json(user);    
  });  
}

exports.deleteUser = function(req, res) {
   var id = req.params.ID;
     userService.delete(id, function(err) {
        if (err) return res.send(500, err.message);
        return res.send(200);
     });
};

exports.deleteAllUser = function(req, res) {
     userService.delete(function(err) {
        if (err) return res.send(500, err.message);
        return res.send(200);
     });
};
