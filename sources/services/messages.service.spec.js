'use strict';

var should   = require('chai').should()
  , messageService = require('./messages.service')
  , utils = require('../config/test.utils') 
;
	
describe('Messages: services', function () {
	 describe('#findByDate()', function () {
	   it('should retrieve a message by date', function (done) {
	     	 messageService.findByDate(new Date(), function(err, messages){
	     	 	should.not.exist(err);
	     	 	should.exist(messages);	     	 	
	     	 	messages.should.have.length(1);
	     	 	var message = messages[0];
	     	 	message.feed.should.equal('other');
	     	 	done();
	     	 })  		
	   });
	});

	 describe('#create()', function () {
	   it('should create a new message', function (done) {
	     
	     messageService.create('infos', new Date('2017-02-25'), function (err, createdMessage) {
	       // Confirm that that an error does not exist
	       should.not.exist(err);	      
	       should.exist(createdMessage);
	       createdMessage.feed.should.equal('infos');
	       // Call done to tell mocha that we are done with this test
	       done();
	     });
	   });
	 });

	 describe('#delete()', function () {
	   it('should delete all message by a date', function (done) {
	     messageService.delete(new Date(), function (err) {
	       // Confirm that that an error does not exist
	       should.not.exist(err);
	       done();
	     });
	   });
	 });

});