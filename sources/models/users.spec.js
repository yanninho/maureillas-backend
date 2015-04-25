var should   = require('chai').should()
  , config = require('../config/environment')
  , User = require('./users')
  , clearDB  = require('mocha-mongoose')(config.mongo.uri, {noClear: true})
  , mongoose = require('mongoose')
;

var id_device = 'APA91bG91N9rYEl9ESe'
	, platform = 'GOOGLE'


describe('Users: models', function () {

	beforeEach(function(done) {
		if (mongoose.connection.db) return done();
		require('../db')(config);
		clearDB(done);
	})

	 describe('#create()', function () {
	   it('should create a new User', function (done) {
	     // Create a User object to pass to User.create()
	     var u = {
	       _id: id_device,
	       platform : platform,
	       active : true,
	       feeds : [
	       		{
	       			name : 'agenda',
	       			suscriber : true
	       		},
	       		{
	       			name : 'infos',
	       			suscriber : false
	       		}
	       ]
	     };
	     User.create(u, function (err, createdUser) {
	       // Confirm that that an error does not exist
	       should.not.exist(err);
	       // verify that the returned user is what we expect
	       createdUser._id.should.equal(id_device);
	       createdUser.platform.should.equal(platform);
	       createdUser.active.should.equal(true);
	       createdUser.feeds[0].name.should.equal('agenda');
	       createdUser.feeds[0].suscriber.should.equal(true);
	       createdUser.feeds[1].name.should.equal('infos');
	       createdUser.feeds[1].suscriber.should.equal(false);
	       // Call done to tell mocha that we are done with this test
	       done();
	     });
	   });
	 });

	 describe('#get All()', function () {
	   it('should retrieve all users', function (done) {

	     User.find(function (err, users) {
	       // Confirm that that an error does not exist
	       should.not.exist(err);
	       // verify one result
	       users.should.have.length(1);
	       var user = users[0];
	       // verify that the returned user is what we expect
	       user._id.should.equal(id_device);
	       user.platform.should.equal(platform);
	       user.active.should.equal(true);
	       user.feeds[0].name.should.equal('agenda');
	       user.feeds[0].suscriber.should.equal(true);
	       user.feeds[1].name.should.equal('infos');
	       user.feeds[1].suscriber.should.equal(false);
	       // Call done to tell mocha that we are done with this test
	       done();
	     });
	   });
	 });

	 describe('#findAndUpdate()', function () {
	   it('should find a user by id and update feeds subscription', function (done) {

	     User.find({ _id: id_device }, function (err, users) {
	       // Confirm that that an error does not exist
	       should.not.exist(err);
	       // verify one result
	       users.should.have.length(1);
	       var user = users[0];
	       // verify that the returned user is what we expect
	       user._id.should.equal(id_device);
	       user.platform.should.equal(platform);
	       user.active.should.equal(true);
	       user.feeds[0].name.should.equal('agenda');
	       user.feeds[0].suscriber.should.equal(true);
	       user.feeds[1].name.should.equal('infos');
	       user.feeds[1].suscriber.should.equal(false);
	       // update subscription
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
	       ]
	       user.feeds = newFeeds;
	       user.save(function(err, user) {
		       // Confirm that that an error does not exist
		       should.not.exist(err);
		       // verify that the returned user is what we expect
		       user._id.should.equal(id_device);
		       user.platform.should.equal(platform);
		       user.active.should.equal(true);
		       user.feeds.should.have.length(3);
		       user.feeds[0].name.should.equal('agenda');
		       user.feeds[0].suscriber.should.equal(false);
		       user.feeds[1].name.should.equal('infos');
		       user.feeds[1].suscriber.should.equal(false);
		       user.feeds[2].name.should.equal('lostAnimals');
		       user.feeds[2].suscriber.should.equal(true);        	   
	       });


	       // Call done to tell mocha that we are done with this test
	       done();
	     });
	   });
	 });

	 describe('#findbyPlatformFeedName()', function () {
	   it('should find all users actives by platform and suscriber feed', function (done) {
	     User.findbyPlatformFeedName(platform, 'lostAnimals', function (err, users) {
	       // Confirm that that an error does not exist
	       should.not.exist(err);
	       // verify one result
	       users.should.have.length(1);
	       var user = users[0];
	       // verify that the returned user is what we expect
	       user._id.should.equal(id_device);
	       user.platform.should.equal(platform);
	       user.active.should.equal(true);
	       user.feeds.should.have.length(3);
	       // Call done to tell mocha that we are done with this test
	       done();
	     });
	   });
	 });
});