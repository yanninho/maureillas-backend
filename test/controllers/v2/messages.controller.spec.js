'use strict';

var requireHelper = require('../../require_helper')
  , app = requireHelper('app')
  , should = require('chai').should()
  , request = require('supertest')
  , utils = require('../../test.utils')  
  , config = requireHelper('config/environment')
  , apiVersion = 'v2'
;

describe('Messages : controllers', function () {

  it('PUT '+ apiVersion +'/messages/{FEED} : should send a messages to devices', function(done) {
    request(app)
    .put('/'+ apiVersion +'/messages')
    .set('authorization', 'Basic key:' + config.security)
    .send({
      categories : ['other','other2']
    })    
    .expect(200)
    .end(function(err, res) {
      should.not.exist(err);
      // var result = res.body;
      // should.exist(result);
      // should.exist(result.google);
      // should.exist(result.google.success);
      // result.google.success.should.equal(1);
      done();
    })
  }); 

  it('POST '+ apiVersion +'/messages : should check messages stored and send message if date equal today', function(done) {
    request(app)
    .post('/'+ apiVersion +'/messages')
    .set('authorization', 'Basic key:' + config.security)
    .expect(200)
    .end(function(err, res) {
      should.not.exist(err);
      // var result = res.body;
      // should.exist(result);
      // should.exist(result.google);
      // should.exist(result.google.success);
      // result.google.success.should.equal(1);
      done();
    })
  }); 

  it('PUT '+ apiVersion +'/messages/{FEED}/{DATE} : should store a message with a date to send later', function(done) {
    request(app)
    .put('/'+ apiVersion +'/messages/other/2014-05-27')
    .set('authorization', 'Basic key:' + config.security)
    .expect(200)
    .end(function(err, res) {
      should.not.exist(err);
      done();
    })
  }); 

  it('PUT '+ apiVersion +'/messages/{FEED}/{DATE} : should store a message with a bad year date to send later', function(done) {
    request(app)
    .put('/'+ apiVersion +'/messages/other/201-05-27')
    .set('authorization', 'Basic key:' + config.security)
    .expect(200)
    .end(function(err, res) {
      should.exist(err);
      done();
    })
  }); 

  it('PUT '+ apiVersion +'/messages/{FEED}/{DATE} : should store a message with a bad month date to send later', function(done) {
    request(app)
    .put('/'+ apiVersion +'/messages/other/2014-0-27')
    .set('authorization', 'Basic key:' + config.security)
    .expect(200)
    .end(function(err, res) {
      should.exist(err);
      done();
    })
  }); 

  it('PUT '+ apiVersion +'/messages/{FEED}/{DATE} : should store a message with a bad day date to send later', function(done) {
    request(app)
    .put('/'+ apiVersion +'/messages/other/2014-05-2')
    .set('authorization', 'Basic key:' + config.security)
    .expect(200)
    .end(function(err, res) {
      should.exist(err);
      done();
    })
  }); 

  it('PUT '+ apiVersion +'/messages : should send a text message to all active users', function(done) {
    request(app)
    .put('/'+ apiVersion +'/messages/custom')
    .set('authorization', 'Basic key:' + config.security)
    .expect(200)
    .send({
      text : 'A example text to test'
    })
    .end(function(err, res) {
      should.not.exist(err);
      done();
    })
  }); 

  it('PUT '+ apiVersion +'/messages : should send a text message to all active users without text param throw exception', function(done) {
    request(app)
    .put('/'+ apiVersion +'/messages/custom')
    .set('authorization', 'Basic key:' + config.security)
    .expect(200)
    .end(function(err, res) {
      should.exist(err);
      done();
    })
  }); 

});