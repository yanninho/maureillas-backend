'use strict';

var requireHelper = require('../require_helper')
  , should   = require('chai').should()
  , apn = requireHelper('services/apn.service')
  , config = requireHelper('config/environment');
	
describe('apn: services', function () {
	 describe('#sendMessage()', function () {
	   it('should send a message with Apple push notification service', function (done) {
	     	apn.sendMessage(
	     		 ['1'],
	     		 'Test apn Maureillas Application',
	     		 'main',
	     		function (err, result) {
	    			// should.not.exist(err);
	    			// result.success.should.equal(tests_devices.length);	    			
	    			// result.failure.should.equal(0);	    			
	    			done();
				});	   		
	   });
	   it('should throw an exception because registration_ids is null', function (done) {
		     	apn.sendMessage(
		     		 null,
		     		 null,
		     		 null,
		     		function (err, result) {
		    			should.exist(err);
		    			
				});
				done();  		
	   });
	   it('should throw an exception because message is null', function (done) {
		     	apn.sendMessage(
		     		 ['1'],
		     		 null,
		     		 'main',
		     		function (err, result) {
		    			should.exist(err);
				});
				done();  		
	   });
	 });

});