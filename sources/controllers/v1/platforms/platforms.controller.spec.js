'use strict';

var app = require('../../../app')
  , should = require('chai').should()
  , request = require('supertest')
  , utils = require('../../../config/test.utils')  
  , config = require('../../../config/environment')
;

describe('Platforms : controllers', function () {

  it('GET /platforms : should return list of platforms', function(done) {
    request(app)
    .get('/v1/platforms')
    .set('authorization', 'Basic key:' + config.security)
    .expect(200)
    .end(function(err, res) {
      should.not.exist(err);
      var platforms = res.body;
      should.exist(platforms);
      platforms.should.have.length(2);
      should.not.exist(platforms[0]._id);
      should.exist(platforms[0].name);
      done();
    })
  }); 

  it('PUT /platforms/{PLATFORM} : should create a platform stored on database', function(done) {
    request(app)
    .put('/v1/platforms/windowsPhone')
    .set('authorization', 'Basic key:' + config.security)
    .expect(200)
    .end(function(err, res) {
      should.not.exist(err);
      done();
    })
  }); 


  it('DELETE /platforms/{PLATFORM} : should delete a platform from database by name', function(done) {
    request(app)
    .delete('/v1/platforms/IOS')
    .set('authorization', 'Basic key:' + config.security)
    .expect(200)
    .end(function(err, res) {
      should.not.exist(err);
      done();
    })
  }); 

});