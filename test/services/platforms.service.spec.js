'use strict';

var requireHelper = require('../require_helper')
  , should   = require('chai').should()
  , platformService = requireHelper('services/platforms.service')
  , utils = require('../test.utils') 
;
	
describe('Platforms: services', function () {
	 describe('#findByName()', function () {
	   it('should retrieve a platform by her name', function (done) {
	     	 platformService.findByName('GOOGLE', function(err, platform){
	     	 	should.not.exist(err);
	     	 	should.exist(platform);
	     	 	platform.name.should.equal('GOOGLE');
	     	 	done();
	     	 })  		
	   });
	});

	 describe('#create()', function () {
	   it('should create a new Platform', function (done) {
	     // Create a Platform object to pass to Platform.create()
	     platformService.create('WINDOWS PHONE', function (err, createdPlatform) {
	       // Confirm that that an error does not exist
	       should.not.exist(err);
	       // verify that the returned platform is what we expect
	       should.exist(createdPlatform);
	       createdPlatform.name.should.equal('WINDOWS PHONE');
	       // Call done to tell mocha that we are done with this test
	       done();
	     });
	   });
	 });

	 describe('#delete()', function () {
	   it('should delete a Platform by name', function (done) {
	     // delete a Platform object to pass to Platform.delete()
	     platformService.delete('IOS', function (err) {
	       // Confirm that that an error does not exist
	       should.not.exist(err);
	       done();
	     });
	   });
	 });

	 describe('#get All()', function () {
	   it('should retrieve all platforms', function (done) {

	     platformService.findAll(function (err, platforms) {
	       // Confirm that that an error does not exist
	       should.not.exist(err);
	       // verify one result
	       should.exist(platforms);
	       platforms.should.have.length(2);	     
	       // verify that the returned platform is what we expect
	       platforms[0].name.should.equal('IOS');	       
	       platforms[1].name.should.equal('GOOGLE');	       
	       // Call done to tell mocha that we are done with this test
	       done();
	     });
	   });
	 });
});