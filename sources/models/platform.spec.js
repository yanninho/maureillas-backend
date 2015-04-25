var should   = require('chai').should()
  , config = require('../config/environment')
  , Platform = require('./platforms')
  , clearDB  = require('mocha-mongoose')(config.mongo.uri, {noClear: true})
  , mongoose = require('mongoose')
;
	
describe('Platform: models', function () {

	beforeEach(function(done) {
		if (mongoose.connection.db) return done();
		require('../db')(config);
		clearDB(done);
	})

	 describe('#create()', function () {
	   it('should create a new Platform', function (done) {
	     // Create a Platform object to pass to Platform.create()
	     var p = {
	        name : 'IOS'
	     };
	     Platform.create(p, function (err, createdPlatform) {
	       // Confirm that that an error does not exist
	       should.not.exist(err);
	       // verify that the returned platform is what we expect
	       createdPlatform.name.should.equal('IOS');
	       // Call done to tell mocha that we are done with this test
	       done();
	     });
	   });
	 });

	 describe('#get All()', function () {
	   it('should retrieve all platforms', function (done) {

	     Platform.find(function (err, platforms) {
	       // Confirm that that an error does not exist
	       should.not.exist(err);
	       // verify one result
	       platforms.should.have.length(1);
	       var platform = platforms[0];
	       // verify that the returned platform is what we expect
	       platform.name.should.equal('IOS');	       
	       // Call done to tell mocha that we are done with this test
	       done();
	     });
	   });
	 });
});