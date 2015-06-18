/**
 * Main application routes
 */

'use strict';

var errors = require('./errors');

module.exports = function(app) {
  // routes version
  app.use('/v1', require('./controllers/v1'));
  
  // erreur url
  app.route('/*')
   .get(errors[404]);

};
