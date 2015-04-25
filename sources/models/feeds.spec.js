var should   = require('chai').should()
  , config = require('../config/environment')
  , Feed = require('./feeds')
  , clearDB  = require('mocha-mongoose')(config.mongo.uri, {noClear: true})
  , mongoose = require('mongoose')
;
	
describe('Feeds: models', function () {

	beforeEach(function(done) {
		if (mongoose.connection.db) return done();
		require('../db')(config);
		clearDB(done);
	})

	 describe('#create()', function () {
	   it('should create a new Feed', function (done) {
	     // Create a Feed object to pass to Feed.create()
	     var f = {
	        name : 'agenda'
	     };
	     Feed.create(f, function (err, createdFeed) {
	       // Confirm that that an error does not exist
	       should.not.exist(err);
	       // verify that the returned feed is what we expect
	       createdFeed.name.should.equal('agenda');
	       // Call done to tell mocha that we are done with this test
	       done();
	     });
	   });
	 });

	 describe('#get All()', function () {
	   it('should retrieve all feeds', function (done) {

	     Feed.find(function (err, feeds) {
	       // Confirm that that an error does not exist
	       should.not.exist(err);
	       // verify one result
	       feeds.should.have.length(1);
	       var feed = feeds[0];
	       // verify that the returned feed is what we expect
	       feed.name.should.equal('agenda');	       
	       // Call done to tell mocha that we are done with this test
	       done();
	     });
	   });
	 });
});