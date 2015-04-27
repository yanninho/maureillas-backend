'use strict';

var app = require('../../../app')
  , should = require('chai').should()
  , request = require('supertest')
  , utils = require('../../../config/test.utils')  
  , config = require('../../../config/environment')
;

describe('Feeds : controllers', function () {

  it('should return list of feeds : GET /feeds', function(done) {
    request(app)
    .get('/v1/feeds')
    .auth('key', config.security)
    .expect(200)
    .end(function(err, res) {
      should.not.exist(err);
      var feeds = res.body;
      should.exist(feeds);
      done();
    })
  }); 

  it('should create a feed stored on database : PUT /feeds/{FEED}', function(done) {
    request(app)
    .put('/v1/feeds/another')
    .auth('key', config.security)
    .expect(200)
    .end(function(err, res) {
      should.not.exist(err);
      var feedResult = res.body;
      should.exist(feedResult);
      feedResult.name.should.equal('another');
      done();
    })
  }); 


  it('should delete a feed from database by name : DELETE /feeds/{FEED}', function(done) {
    request(app)
    .delete('/v1/feeds/news')
    .auth('key', config.security)
    .expect(200)
    .end(function(err, res) {
      should.not.exist(err);
      done();
    })
  }); 

});