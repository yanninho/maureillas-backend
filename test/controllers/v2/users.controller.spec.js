'use strict';

var requireHelper = require('../../require_helper')
  , app = requireHelper('app')
  , should = require('chai').should()
  , config = requireHelper('config/environment')
  , request = require('supertest')
  , utils = require('../../test.utils') 
  , apiVersion = 'v2'
;

describe('Users : controllers', function () {

  it('PUT '+ apiVersion +'/users : should create a user stored on database', function(done) {
    request(app)
    .put('/'+ apiVersion +'/users')
    .set('authorization', 'Basic key:' + config.security)
    .send({ 
      user: {
        id : 'AZ34RT5Y',
        platform : 'IOS'
      }
    })
    .expect(200)
    .end(function(err, res) {
      should.not.exist(err);
      var user = res.body;
      should.exist(user);
      user._id.should.equal('AZ34RT5Y');
      done();
    })
  }); 

  it('PUT '+ apiVersion +'/users : should create a user already exist on database', function(done) {
    request(app)
    .put('/'+ apiVersion +'/users')
    .set('authorization', 'Basic key:' + config.security)
    .send({ 
      user: {
        id : 'T6Y890OK',
        platform : 'IOS'
      }
    })
    .expect(200)
    .end(function(err, res) {
      should.not.exist(err);
      var user = res.body;
      should.exist(user);
      user._id.should.equal('T6Y890OK');
      done();
    })
  }); 

  it('GET '+ apiVersion +'/users : should return the complete list of users stored on database', function(done) {
    request(app)
    .get('/'+ apiVersion +'/users')
    .set('authorization', 'Basic key:' + config.security)
    .expect(200)
    .end(function(err, res) {
      should.not.exist(err);
      var users = res.body;
      should.exist(users);
      users.should.have.length(5);
      done();
    })
  });  

  it('GET '+ apiVersion +'/users/{ID} : should return a user by ID', function(done) {
    request(app)
    .get('/'+ apiVersion +'/users/T6Y890OK')
    .set('authorization', 'Basic key:' + config.security)
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

  it('DELETE '+ apiVersion +'/users/{ID} : should delete a user from database by ID', function(done) {
    request(app)
    .delete('/'+ apiVersion +'/users/T6Y890OK')
    .set('authorization', 'Basic key:' + config.security)
    .expect(200)
    .end(function(err, res) {
      should.not.exist(err);
      done();
    })
  });  

  it('POST '+ apiVersion +'/users/{ID} : should update user data', function(done) {
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
    .post('/'+ apiVersion +'/users/T6Y890OK')
    .set('authorization', 'Basic key:' + config.security)
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