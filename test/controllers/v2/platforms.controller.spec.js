'use strict';

var requireHelper = require('../../require_helper')
  , app = requireHelper('app')
  , should = require('chai').should()
  , request = require('supertest')
  , utils = require('../../test.utils')  
  , config = requireHelper('config/environment')
  , apiVersion = 'v2'
;

describe('Platforms : controllers', function () {

  it('GET '+ apiVersion +'/platforms : should return list of platforms', function(done) {
    request(app)
    .get('/'+ apiVersion +'/platforms')
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

  it('PUT '+ apiVersion +'/platforms/{PLATFORM} : should create a platform stored on database', function(done) {
    request(app)
    .put('/'+ apiVersion +'/platforms/windowsPhone')
    .set('authorization', 'Basic key:' + config.security)
    .expect(200)
    .end(function(err, res) {
      should.not.exist(err);
      done();
    })
  }); 


  it('DELETE '+ apiVersion +'/platforms/{PLATFORM} : should delete a platform from database by name', function(done) {
    request(app)
    .delete('/'+ apiVersion +'/platforms/IOS')
    .set('authorization', 'Basic key:' + config.security)
    .expect(200)
    .end(function(err, res) {
      should.not.exist(err);
      done();
    })
  }); 

});