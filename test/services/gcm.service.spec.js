'use strict';

var requireHelper = require('../require_helper')
  , should   = require('chai').should()
  , gcm = requireHelper('services/gcm.service')
  , config = requireHelper('config/environment')
  , tests_devices = config.gcm.tests_devices.android;
	
describe('Gcm: services', function () {
	 describe('#sendMessage()', function () {
	   it('should send a message with google cloud messaging', function (done) {
	     	gcm.sendMessage(
	     		 tests_devices,
	     		 'Test GCM Maureillas Application',
	     		 'main',
	     		function (err, result) {
	    			should.not.exist(err);
	    			result.success.should.equal(tests_devices.length);	    			
	    			result.failure.should.equal(0);	    			
	    			done();
				});	   		
	   });
	   it('should throw an exception because registration_ids is null', function (done) {
		     	gcm.sendMessage(
		     		 null,
		     		 null,
		     		 null,
		     		function (err, result) {
		    			should.exist(err);
		    			
				});
				done();  		
	   });
	   it('should throw an exception because message is null', function (done) {
		     	gcm.sendMessage(
		     		 tests_devices,
		     		 null,
		     		 'main',
		     		function (err, result) {
		    			should.exist(err);
				});
				done();  		
	   });
	 });

});