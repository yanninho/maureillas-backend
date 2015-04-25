'use strict';

// var app = require('../../app')
//   , should = require('should')
//   , config = require('../../config/environment')
//   , utils = require('../../config/test.utils')
//   , request = require('supertest')
// ;

// describe('Users : controllers', function () {
//   it('should create a user stored on database : PUT /users/{ID}/{PLATFORM}', function(done) {
//     request(app)
//     .put('/users/AZ34RT5Y/android')
//     .expect(200)
//     .end(function(err, res) {
//       should.not.exist(err);
//       done();
//     })
//   }); 

//   it('should return the complete list of users stored on database : GET /users', function(done) {
//     request(app)
//     .get('/users')
//     .expect(200)
//     .end(function(err, res) {
//       should.not.exist(err);
//       done();
//     })
//   });  

//   it('should return a user by ID : GET /users/{ID}', function(done) {
//     request(app)
//     .get('/users/AZERTY')
//     .expect(200)
//     .end(function(err, res) {
//       should.not.exist(err);
//       done();
//     })
//   });  

//   it('should delete a user from database by ID : DELETE /users/{ID}', function(done) {
//     request(app)
//     .delete('/users')
//     .expect(200)
//     .end(function(err, res) {
//       should.not.exist(err);
//       done();
//     })
//   });  

//   it('should update user data : POST /users/{ID}', function(done) {
//     var newFeeds = [
//      {
//       name : 'agenda',
//       suscriber : false
//     },
//     {
//       name : 'infos',
//       suscriber : false
//     },
//     {
//       name : 'lostAnimals', 
//       suscriber : true
//     }
//     ]

//     request(app)
//     .post({url:'/users/AZERTY', feeds: newFeeds)
//     .expect(200)
//     .end(function(err, res) {
//       should.not.exist(err);
//       done();
//     })
//     });  

// }