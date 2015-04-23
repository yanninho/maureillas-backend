/**
 * Main application routes
 */

'use strict';

var errors = require('./errors');

module.exports = function(app) {

  // erreur url
  app.route('/*')
   .get(errors[404]);

};
