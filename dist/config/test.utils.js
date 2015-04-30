'use strict';

var config = require('./environment');
var mongoose = require('mongoose');
var platformTest = require('../models/platforms.seed');
var feedTest = require('../models/feeds.seed');
var userTest = require('../models/users.seed');
var messageTest = require('../models/messages.seed');

// ensure the NODE_ENV is set to 'test'
// this is helpful when you would like to change behavior when testing
process.env.NODE_ENV = 'test';

beforeEach(function (done) {

 function clearDB() {
   for (var i in mongoose.connection.collections) {
     mongoose.connection.collections[i].remove();
   }
   populateDatabase();
   return done();
 }

 function populateDatabase() {
     platformTest.seed();
     feedTest.seed();
     userTest.seed();  
     messageTest.seed();
 }

 function reconnect() {
   mongoose.connect(config.mongo.uri, function (err) {
     if (err) {
       throw err;
     }
     return clearDB();
   });
 }


 function checkState() {
   switch (mongoose.connection.readyState) {
   case 0:
     reconnect();
     break;
   case 1:
     clearDB();
     break;
   default:
     process.nextTick(checkState);
   }
}

 checkState();
});

afterEach(function (done) {
 mongoose.disconnect();
 return done();
});