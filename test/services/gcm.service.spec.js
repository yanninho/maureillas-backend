'use strict';

var requireHelper = require('../require_helper')
  , should   = require('chai').should()
  , gcm = requireHelper('services/gcm.service')
  , config = requireHelper('config/environment')
  , tests_devices = config.gcm.tests_devices.android
;
	
describe('Gcm: services', function () {
	 describe('#sendMessage()', function () {
	   it('should send a message with google cloud messaging', function (done) {
	     	gcm.sendMessage(
	     		 tests_devices,
	     		 'Test GCM Maureillas Application',
	     		function (err, result) {
	    			should.not.exist(err);
	    			result.success.should.equal(tests_devices.length);	    			
	    			result.failure.should.equal(0);	    			
	    			done();
				});	   		
	   });
	   it('should throw an exception because registration_ids is null', function (done) {
	   		try {
		     	gcm.sendMessage(
		     		 null,
		     		 null,
		     		function (err, result) {
		    			should(null).not.be.ok;
		    			done();
				});
				should(null).not.be.ok;
				done();
	   		}
	   		catch(error) {
	   			var message = error.message;
	   			message.should.equals('the first parameter must contains an array of registration ids');
	   			done();
	   		}   		
	   });
	   it('should throw an exception because message is null', function (done) {
	   		try {
		     	gcm.sendMessage(
		     		 tests_devices,
		     		 null,
		     		function (err, result) {
		    			should(null).not.be.ok;
		    			done();
				});
				should(null).not.be.ok;
				done();
	   		}
	   		catch(error) {
	   			var message = error.message;
	   			message.should.equals('the second parameter must contains a message to send');
	   			done();
	   		}   		
	   });
	 });

});