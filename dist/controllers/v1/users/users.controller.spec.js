'use strict';

var app = require('../../../app')
  , should = require('chai').should()
  , config = require('../../../config/environment')
  , request = require('supertest')
  , utils = require('../../../config/test.utils')  
  , config = require('../../../config/environment')
;

describe('Users : controllers', function () {

  it('PUT /users/{ID}/{PLATFORM} : should create a user stored on database', function(done) {
    request(app)
    .put('/v1/users/AZ34RT5Y/IOS')
    //.auth('key', config.security)
    .expect(200)
    .end(function(err, res) {
      should.not.exist(err);
      var user = res.body;
      should.exist(user);
      user._id.should.equal('AZ34RT5Y');
      done();
    })
  }); 

  it('PUT /users/{ID}/{PLATFORM} : should create a user already exist on database', function(done) {
    request(app)
    .put('/v1/users/T6Y890OK/IOS')
    //.auth('key', config.security)
    .expect(200)
    .end(function(err, res) {
      should.not.exist(err);
      var user = res.body;
      should.exist(user);
      user._id.should.equal('T6Y890OK');
      done();
    })
  }); 

  it('GET /users : should return the complete list of users stored on database', function(done) {
    request(app)
    .get('/v1/users')
    //.auth('key', config.security)
    .expect(200)
    .end(function(err, res) {
      should.not.exist(err);
      var users = res.body;
      should.exist(users);
      users.should.have.length(5);
      done();
    })
  });  

  it('GET /users/{ID} : should return a user by ID', function(done) {
    request(app)
    .get('/v1/users/T6Y890OK')
    //.auth('key', config.security)
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

  it('DELETE /users/{ID} : should delete a user from database by ID', function(done) {
    request(app)
    .delete('/v1/users/T6Y890OK')
    //.auth('key', config.security)
    .expect(200)
    .end(function(err, res) {
      should.not.exist(err);
      done();
    })
  });  

  it('POST /users/{ID} : should update user data', function(done) {
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
    //.auth('key', config.security)
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