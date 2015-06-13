'use strict';

var requireHelper = require('../require_helper')
  , should   = require('chai').should()
  , feedService = requireHelper('services/feeds.service')
  , feedModel = requireHelper('models/feeds')
  , utils = require('../test.utils') 
;
	
describe('Feeds: services', function () {

	 describe('#create()', function () {
	   it('should create a new Feed', function (done) {
	     // Create a Feed object to pass to Feed.create()
	     feedService.create('other', function (err, createdFeed) {
	       // Confirm that that an error does not exist
	       should.not.exist(err);
	       // verify that the returned platform is what we expect
	       should.exist(createdFeed);
	       createdFeed.name.should.equal('other');
	       // Call done to tell mocha that we are done with this test
	       done();
	     });
	   });
	 });

	 describe('#delete()', function () {
	   it('should delete a Feed by name', function (done) {
	     // Create a Feed object to pass to Feed.create()
	     feedService.delete('agenda', function (err) {
	       // Confirm that that an error does not exist
	       should.not.exist(err);
	       done();
	     });
	   });
	 });

	 describe('#get All()', function () {
	   it('should retrieve all feeds', function (done) {

	     feedService.findAll(function (err, feeds) {
	       // Confirm that that an error does not exist
	       should.not.exist(err);
	       // verify one result
	       should.exist(feeds);
	       feeds.should.have.length(3);	     
	       // verify that the returned platform is what we expect
	       feeds[0].name.should.equal('agenda');	       
	       feeds[1].name.should.equal('animals');	       
	       feeds[2].name.should.equal('news');	       
	       // Call done to tell mocha that we are done with this test
	       done();
	     });
	   });
	 });
});