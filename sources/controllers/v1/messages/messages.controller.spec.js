'use strict';

var app = require('../../../app')
  , should = require('chai').should()
  , request = require('supertest')
  , utils = require('../../../config/test.utils')  
  , config = require('../../../config/environment')
;

describe('Messages : controllers', function () {

  it('should send a messages to devices : POST /messages/{FEED}', function(done) {
    request(app)
    .post('/v1/messages/other')
    .auth('key', config.security)
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
});