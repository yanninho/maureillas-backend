'use strict';

var requireHelper = require('../require_helper')
  , app = requireHelper('app')
  , should = require('chai').should()
  , request = require('supertest')
  , utils = require('../test.utils')  
  , config = requireHelper('config/environment')
;

describe('Messages : controllers', function () {

  it('PUT /messages/{FEED} : should send a messages to devices', function(done) {
    request(app)
    .put('/v1/messages/other')
    .set('authorization', 'Basic key:' + config.security)
    .expect(200)
    .end(function(err, res) {
      should.not.exist(err);
      var result = res.body;
      should.exist(result);
      should.exist(result.google);
      should.exist(result.google.success);
      result.google.success.should.equal(1);
      done();
    })
  }); 

  it('POST /messages : should check messages stored and send message if date equal today', function(done) {
    request(app)
    .post('/v1/messages')
    .set('authorization', 'Basic key:' + config.security)
    .expect(200)
    .end(function(err, res) {
      should.not.exist(err);
      var result = res.body;
      should.exist(result);
      should.exist(result.google);
      should.exist(result.google.success);
      result.google.success.should.equal(1);
      done();
    })
  }); 

  it('PUT /messages/{FEED}/{DATE} : should store a message with a date to send later', function(done) {
    request(app)
    .put('/v1/messages/other/2014-05-27')
    .set('authorization', 'Basic key:' + config.security)
    .expect(200)
    .end(function(err, res) {
      should.not.exist(err);
      done();
    })
  }); 

  it('PUT /messages/{FEED}/{DATE} : should store a message with a bad year date to send later', function(done) {
    request(app)
    .put('/v1/messages/other/201-05-27')
    .set('authorization', 'Basic key:' + config.security)
    .expect(200)
    .end(function(err, res) {
      should.exist(err);
      done();
    })
  }); 

  it('PUT /messages/{FEED}/{DATE} : should store a message with a bad month date to send later', function(done) {
    request(app)
    .put('/v1/messages/other/2014-0-27')
    .set('authorization', 'Basic key:' + config.security)
    .expect(200)
    .end(function(err, res) {
      should.exist(err);
      done();
    })
  }); 

  it('PUT /messages/{FEED}/{DATE} : should store a message with a bad day date to send later', function(done) {
    request(app)
    .put('/v1/messages/other/2014-05-2')
    .set('authorization', 'Basic key:' + config.security)
    .expect(200)
    .end(function(err, res) {
      should.exist(err);
      done();
    })
  }); 

  it('PUT /messages : should send a text message to all active users', function(done) {
    request(app)
    .put('/v1/messages')
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

  it('PUT /messages : should send a text message to all active users without text param throw exception', function(done) {
    request(app)
    .put('/v1/messages')
    .set('authorization', 'Basic key:' + config.security)
    .expect(200)
    .end(function(err, res) {
      should.exist(err);
      done();
    })
  }); 

});