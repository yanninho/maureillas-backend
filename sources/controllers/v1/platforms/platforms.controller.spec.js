'use strict';

var app = require('../../../app')
  , should = require('chai').should()
  , request = require('supertest')
  , utils = require('../../../config/test.utils')  
  , config = require('../../../config/environment')
;

describe('Platforms : controllers', function () {

  it('should return list of platforms : GET /platforms', function(done) {
    request(app)
    .get('/v1/platforms')
    .auth('key', config.security)
    .expect(200)
    .end(function(err, res) {
      should.not.exist(err);
      var platforms = res.body;
      should.exist(platforms);
      done();
    })
  }); 

  it('should create a platform stored on database : PUT /platforms/{PLATFORM}', function(done) {
    request(app)
    .put('/v1/platforms/windowsPhone')
    .auth('key', config.security)
    .expect(200)
    .end(function(err, res) {
      should.not.exist(err);
      var platformResult = res.body;
      should.exist(platformResult);
      platformResult.name.should.equal('windowsPhone');
      done();
    })
  }); 


  it('should delete a platform from database by name : DELETE /platforms/{PLATFORM}', function(done) {
    request(app)
    .delete('/v1/platforms/IOS')
    .auth('key', config.security)
    .expect(200)
    .end(function(err, res) {
      should.not.exist(err);
      done();
    })
  }); 

});