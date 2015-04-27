/**
 * Main application routes
 */

'use strict';

var errors = require('./errors');

module.exports = function(app) {
  // roads
  app.use('/v1/users', require('./controllers/v1/users'));
  app.use('/v1/messages', require('./controllers/v1/messages'));
  app.use('/v1/feeds', require('./controllers/v1/feeds'));
  app.use('/v1/platforms', require('./controllers/v1/platforms'));

  // erreur url
  app.route('/*')
   .get(errors[404]);

};
