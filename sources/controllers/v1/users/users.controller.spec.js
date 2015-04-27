'use strict';

var app = require('../../../app')
  , should = require('chai').should()
  , config = require('../../../config/environment')
  , request = require('supertest')
  , utils = require('../../../config/test.utils')  
  , config = require('../../../config/environment')
;

describe('Users : controllers', function () {

  it('should create a user stored on database : PUT /users/{ID}/{PLATFORM}', function(done) {
    request(app)
    .put('/v1/users/AZ34RT5Y/IOS')
    .auth('key', config.security)
    .expect(200)
    .end(function(err, res) {
      should.not.exist(err);
      var userResult = res.body;
      should.exist(userResult);
      userResult._id.should.equal('AZ34RT5Y');
      userResult.platform.should.equal('IOS');
      should.exist(userResult.feeds);
      userResult.feeds.should.have.length(3);
      done();
    })
  }); 

  it('should return the complete list of users stored on database : GET /users', function(done) {
    request(app)
    .get('/v1/users')
    .auth('key', config.security)
    .expect(200)
    .end(function(err, res) {
      should.not.exist(err);
      var users = res.body;
      users.should.have.length(4);
      done();
    })
  });  

  it('should return a user by ID : GET /users/{ID}', function(done) {
    request(app)
    .get('/v1/users/T6Y890OK')
    .auth('key', config.security)
    .expect(200)
    .end(function(err, res) {
      should.not.exist(err);
      var user = res.body;
      should.exist(user);
      user._id.should.equal('T6Y890OK');
      user.platform.should.equal('GOOGLE');      
      done();
    })
  });  

  it('should delete a user from database by ID : DELETE /users/{ID}', function(done) {
    request(app)
    .delete('/v1/users/T6Y890OK')
    .auth('key', config.security)
    .expect(200)
    .end(function(err, res) {
      should.not.exist(err);
      done();
    })
  });  

  it('should update user data : POST /users/{ID}', function(done) {
    var newFeeds = [
     {
      name : 'agenda',
      suscriber : false
    },
    {
      name : 'infos',
      suscriber : false
    },
    {
      name : 'lostAnimals', 
      suscriber : true
    }
    ];

    request(app)
    .post('/v1/users/T6Y890OK')
    .auth('key', config.security)
    .send({ 
      feeds: newFeeds
    })
    .expect(200)
    .end(function(err, res) {
      should.not.exist(err);
      done();
    })
    });  

});