/**
 * Main application routes
 */

'use strict';

var errors = require('./errors');

module.exports = function(app) {
  // roads
  app.use('/users', require('./controllers/users'));

  // erreur url
  app.route('/*')
   .get(errors[404]);

};
