'use strict';

var should   = require('chai').should()
  , userService = require('./users.service')
  , utils = require('../config/test.utils') 
;
	
describe('Users: services', function () {

	 describe('#create()', function () {
	   it('should create a new User', function (done) {
	     // Create a User object to pass to User.create()
	     userService.create('DSFSD54', 'IOS', function (err, createdUser) {
	       // Confirm that that an error does not exist
	       should.not.exist(err);
	       // verify that the returned platform is what we expect
	       should.exist(createdUser);
	       createdUser._id.should.equal('DSFSD54');
	       createdUser.platform.should.equal('IOS');
	       should.exist(createdUser.feeds);
	       createdUser.feeds.should.have.length(3);
	       // Call done to tell mocha that we are done with this test
	       done();
	     });
	   });
	 });


	 describe('#get All()', function () {
	   it('should retrieve all users', function (done) {

	     userService.findAll(function (err, users) {
	       // Confirm that that an error does not exist
	       should.not.exist(err);
	       // verify one result
	       users.should.have.length(5);
	       var user = users[0];
	       // verify that the returned user is what we expect
	       // user._id.should.equal('Azsqer54Y');
	       // user.platform.should.equal('IOS');
	       // user.active.should.equal(true);
	       // user.feeds[0].name.should.equal('feed fake');
	       // user.feeds[0].suscriber.should.equal(true);
	       // Call done to tell mocha that we are done with this test
	       done();
	     });
	   });
	 }); 

	 describe('#get ActiveUsers()', function () {
	   it('should retrieve all active users', function (done) {

	     userService.findActive(function (err, users) {
	       // Confirm that that an error does not exist
	       should.not.exist(err);
	       // verify one result
	       users.should.have.length(4);
	       // Call done to tell mocha that we are done with this test
	       done();
	     });
	   });
	 });

	 describe('#Update()', function () {
	   it('should update feeds subscription by user id', function (done) {
	   	
	   	var userId = 'Azsqer54Y';
	   	var feeds = [
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
	   	
	   	userService.updateFeeds(userId, feeds, function(err) {
		       // Confirm that that an error does not exist
		       should.not.exist(err);
		       	done();        	   
		});
	   });
	 });

	 describe('#addFeed()', function () {
	   it('should add a new feed to all users', function (done) {
	   	
	   	var feed = {
	   		name : 'addedFeed'
	   	};
	   	
	   	userService.addFeed(feed, function(err) {
		       // Confirm that that an error does not exist
		       should.not.exist(err);
		       	done();        	   
		});
	   });
	 });

	 describe('#findbyPlatformFeedName()', function () {
	   it('should find all users actives by platform and suscriber feed', function (done) {
	     userService.findbyPlatformFeedName('IOS', 'feed fake', function (err, users) {
	       // Confirm that that an error does not exist
	       should.not.exist(err);
	       // verify one result
	       users.should.have.length(1);
	       var user = users[0];
	       // verify that the returned user is what we expect
	       user._id.should.equal('Azsqer54Y');
	       user.platform.should.equal('IOS');
	       user.active.should.equal(true);
	       user.feeds.should.have.length(1);
	       // Call done to tell mocha that we are done with this test
	       done();
	     });
	   });
	 });

	 describe('#findbyId()', function () {
	   it('should find a user by his id', function (done) {
	     userService.findById('Azsqer54Y', function (err, user) {
	       // Confirm that that an error does not exist
	       should.not.exist(err);
	       // verify one result
	       should.exist(user);	      
	       // verify that the returned user is what we expect
	       user._id.should.equal('Azsqer54Y');
	       user.platform.should.equal('IOS');
	       user.active.should.equal(true);
	       user.feeds.should.have.length(1);
	       // Call done to tell mocha that we are done with this test
	       done();
	     });
	   });
	 });

	 describe('#deleteId()', function () {
	   it('should delete a user by his id', function (done) {
	     userService.delete('Azsqer54Y', function (err, result) {
	       // Confirm that that an error does not exist
	       should.not.exist(err);
	       // verify one result
	       should.exist(result);	      
	       // Call done to tell mocha that we are done with this test
	       done();
	     });
	   });
	 });


});