'use strict';

var platformModel = require('../models/platforms')
;


exports.findByName = function (platform, callback) {
  if (!platform) {
    callback('Invalide parameter');
  }

  platformModel.findOne({
    "name" : platform
  }, callback);         
} 

exports.create = function (platform, callback) {
  if (!platform) {
    callback('Invalide parameter');
  }
  var newPlatform = {
    name : platform
  }
  platformModel.create(newPlatform, callback);
}

exports.delete = function (platformName, callback) {
  platformModel.find({
    "name" : platformName
  },
  function(err, platform) {
    if (err || !platform) callback('Platform not found');
    platformModel.remove(platform, callback);
  })
}

exports.findAll = function(callback) {
  platformModel.find(callback);
}