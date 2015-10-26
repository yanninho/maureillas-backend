'use strict';

var requireHelper = require('../../require_helper')
  , app = requireHelper('app')
  , should = require('chai').should()
  , request = require('supertest')
  , utils = require('../../test.utils')  
  , config = requireHelper('config/environment')
  , apiVersion = 'v2'
;

describe('Feeds : controllers', function () {

  it('should return list of feeds : GET '+ apiVersion +'/feeds', function(done) {
    request(app)
    .get('/'+ apiVersion +'/feeds')
    .set('authorization', 'Basic key:' + config.security)
    .expect(200)
    .end(function(err, res) {
      should.not.exist(err);
      var feeds = res.body;
      should.exist(feeds);
      feeds.should.have.length(3);
      should.not.exist(feeds[0]._id);
      should.exist(feeds[0].name);      
      done();
    })
  }); 

  it('should create a feed stored on database : PUT '+ apiVersion +'/feeds/{FEED}', function(done) {
    request(app)
    .put('/'+ apiVersion +'/feeds/another')
    .set('authorization', 'Basic key:' + config.security)
    .expect(200)
    .end(function(err, res) {
      should.not.exist(err);
      done();
    })
  }); 


  it('should delete a feed from database by name : DELETE '+ apiVersion +'/feeds/{FEED}', function(done) {
    request(app)
    .delete('/'+ apiVersion +'/feeds/news')
    .set('authorization', 'Basic key:' + config.security)
    .expect(200)
    .end(function(err, res) {
      should.not.exist(err);
      done();
    })
  }); 

});