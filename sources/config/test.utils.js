'use strict';
var config = require('./environment')
   ,userTest = require('../models/users.seed')
;

// ensure the NODE_ENV is set to 'test'
// this is helpful when you would like to change behavior when testing
process.env.NODE_ENV = 'test';

before(function(done) {
  
})